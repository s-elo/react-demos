const rootDom = document.querySelector("#root");

// const rElement = React.createElement(
//   "div",
//   { id: "Text" },
//   React.createElement("h1", null, "title"),
//   React.createElement("p", null, "text")
// );
// console.log(rElement);
// const element = <div>div created by JSX</div>;
// ReactDOM.render(element, rootDom);

// break the job(construting the fiber tree) into pieces
// should be defined before the render func...
let nextUnitOfWork = null;
let wipRoot = null; // the root of th fiber tree
let currentRoot = null; // to diff the old tree and the new tree
let deletions = null;
// for function component
let wipFiber = null;
let hookIndex = null;

const Simact = {
  createElement,
  render,
  useState,
};

// const element = Simact.createElement(
//   "div",
//   { id: "Text" },
//   Simact.createElement("h1", null, "title"),
//   Simact.createElement("p", null, "text")
// );

// use this comment to direct to the Simact
/** @jsx Simact.createElement */
const element = (
  <div id="Text">
    {/* <h1>title</h1>
    <App name="leo" />
    <p>text</p> */}
    <Counter />
  </div>
);

function App(props) {
  return <h1>Hi {props.name}</h1>;
}

function Counter() {
  const [count, setCount] = Simact.useState(0);
  return <h1 onClick={() => setCount((c) => c + 1)}>Count: {count}</h1>;
}

Simact.render(element, rootDom);

window.requestIdleCallback(workLoop);

function workLoop(IdleDeadline) {
  // should give the control to the browser to do sth else
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    // after perform a piece of work, return the next unit of work
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    // if the remaining time for giving the control is less than 1ms
    // then stop doing our job like rendering
    shouldYield = IdleDeadline.timeRemaining() < 1;
  }

  // when our render job is completed
  if (!nextUnitOfWork && wipRoot) {
    commitRoot(); // wipRoot will be set as null in commitRoot func
  }

  // when the browser is idle, woekloop will be called
  window.requestIdleCallback(workLoop);
}

/**
 *
 * @param {*} fiber
 * @returns nextUnitOfWork
 * 1. create a new Dom but not append it
 * 2. create new fiber for each children
 * 3. determine the next unit of work(fiber)
 * note that the perform stage doesnt actually append the DOM
 * in the browser with only constructing the fiber tree
 * the DOM will be added at the commit phase
 */
function performUnitOfWork(fiber) {
  // 1. create a new Dom but not append it
  // 2. create new fiber for each children
  // note that the root fiber has already had the dom
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    // when fiber.type is a function
    upadteFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // 3. determine the next unit of work(fiber)
  // child -> sibling -> uncle(the sibling of the parent)
  if (fiber.child) return fiber.child;

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;

    // search up to the root fiber to find the uncle
    nextFiber = nextFiber.parent;
  }

  return;
}

function updateHostComponent(fiber) {
  // 1. create a new Dom but not append it
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 2. create new fiber for each children
  const childElements = fiber.props.children;
  // diff the children of the current fiber(work)
  reconcileChildren(fiber, childElements);
}

function upadteFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  // store the old hooks
  wipFiber.hooks = [];

  // fiber.type is a function
  // the return JSX is the child of the function component
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function useState(initVal) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];

  // when rendering, use the state of the old hook if it exists
  const hook = { state: oldHook ? oldHook.state : initVal, queue: [] };

  // run all the actions to change the state
  // the return state is updated
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    // action is a function
    // cache the actions first, run them in the next rendering time (above)
    hook.queue.push(action);

    // reboot the workloop by give non-null value of the nextUnitOfWork
    // it is like rerendering
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };

    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

function reconcileChildren(wipFiber, children) {
  // compare the children of the wipFiber
  // and the children of the old wipFiber(wipFiber.alternate)
  // children is the new tree, oldFiber is the last tree
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let index = 0;
  let prevSibling = null;

  while (index < children.length || oldFiber != null) {
    let newFiber = null;
    const child = children[index];
    const isSameType = oldFiber && child && child.type === oldFiber.type;
    // 1. same type, keep the node, update the props
    if (isSameType) {
      newFiber = {
        type: oldFiber.type,
        props: child.props, // only update the props
        parent: wipFiber, // current unit of work
        dom: oldFiber.dom,
        alternate: oldFiber,
        effectTag: "UPDATE", // used in the commit phase
      };
    }

    // 2. not the same with a new element (oldFiber === null), create new node
    if (child && !isSameType) {
      newFiber = {
        type: child.type,
        props: child.props,
        parent: wipFiber, // current unit of work
        dom: null,
        alternate: oldFiber,
        effectTag: "PLACEMENT", // used in the commit phase
      };
    }

    // 3. not the same with an oldFiber, delete it
    if (oldFiber && !isSameType) {
      oldFiber.effectTag = "DELETION";
      // keep track the nodes that needs to be removed in the commit phase
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling; // next chlid of the wipFiber
    }

    if (index === 0) {
      // only the first child be the child of current fiber
      wipFiber.child = newFiber;
    } else {
      // others will be the siblings of the current child
      prevSibling.sibling = newFiber;
    }

    // each one only has one sibling
    // current newFiber will be the next prevSibling
    prevSibling = newFiber;
    index++;
  }
}

function commitRoot() {
  // handled the nodes that are going to be removed
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  // the tree of the actual DOM in the browser
  currentRoot = wipRoot;
  // have to set it as null so that no next performing
  wipRoot = null;
}

// mount the fiber tree to the actual DOM
function commitWork(fiber) {
  if (!fiber) return;

  let parentFiber = fiber.parent;
  // find the fiber with dom for function component purpose
  while (!parentFiber.dom) {
    parentFiber = parentFiber.parent;
  }

  const parentDom = parentFiber.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    parentDom.appendChild(fiber.dom);
  } else if (fiber.effectTag === "DELETION") {
    // after considering the function component
    // the fiber.dom may be null now
    commitDeletion(fiber, parentDom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.props, fiber.alternate.props);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, parentDom) {
  if (fiber.dom) {
    parentDom.removeChild(fiber.dom);
  } else {
    // function component
    commitDeletion(fiber.child, parentDom);
  }
}

function createElement(type = "div", props = {}, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createDom(fiber) {
  // fiber is an element
  // create nodes
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? // the text is added when adding the props
        document.createTextNode("")
      : document.createElement(fiber.type);

  // add properties of the nodes
  updateDom(dom, fiber.props, {});

  return dom;
}

function updateDom(dom, nextProps, prevProps) {
  const isEvent = (key) => key.startsWith("on");
  const isProp = (key) => key !== "children" && !isEvent(key);
  const isNew = (prev, next) => (key) => prev[key] !== next[key];
  const isRemoved = (next) => (prevKey) => !(prevKey in next);

  // remove the old changed event props(listeners)
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      (key) => isRemoved(nextProps)(key) || isNew(prevProps, nextProps)(key)
    )
    .forEach((eventName) => {
      const eventType = eventName.toLowerCase().slice(2);
      dom.removeEventListener(eventType, prevProps[eventName]);
    });

  // add new event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((eventName) => {
      const eventType = eventName.toLowerCase().slice(2);
      dom.addEventListener(eventType, nextProps[eventName]);
    });

  // remove the deleted props
  Object.keys(prevProps)
    .filter(isProp)
    .filter(isNew(prevProps, nextProps))
    .filter(isRemoved(nextProps))
    .forEach((prop) => {
      dom[prop] = "";
    });

  // update and add the new props
  Object.keys(nextProps)
    .filter(isProp)
    .filter(isNew(prevProps, nextProps))
    .forEach((prop) => {
      dom[prop] = nextProps[prop];
    });
}

function render(element, container) {
  // set the nextUnitOfWork as the root of the fiber tree
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot, // previous old tree (node)
  };

  deletions = [];
  nextUnitOfWork = wipRoot;
}
