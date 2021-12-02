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

const Simact = {
  createElement,
  render,
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
    <h1>title</h1>
    <p>text</p>
  </div>
);

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
    // return without setting another requestIdleCallback
    return commitRoot(); // wipRoot will be set as null in commitRoot func
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
  // note that the root fiber has already had the dom
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 2. create new fiber for each children
  const childElements = fiber.props.children;

  childElements.reduce((prevSibling, child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      parent: fiber, // current unit of work
      dom: null,
    };

    if (index === 0) {
      // only the first child be the child of current fiber
      fiber.child = newFiber;
    } else {
      // others will be the siblings of the current child
      prevSibling.sibling = newFiber;
    }

    // each one only has one sibling
    // current newFiber will be the next prevSibling
    return newFiber;
  }, null);

  // 3. determine the next unit of work(fiber)
  // child -> sibling -> uncle(the sibling of the parent)
  if (fiber.child) return fiber.child;

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;

    // search up to the root fiber
    nextFiber = nextFiber.parent;
  }

  return;
}

function commitRoot() {
  commitWork(wipRoot.child);
  // have to set it as null so that no next performing
  wipRoot = null;
}

// mount the fiber tree to the actual DOM
function commitWork(fiber) {
  if (!fiber) return;

  fiber.parent.dom.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
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
  Object.keys(fiber.props)
    .filter((key) => key !== "children")
    .forEach((prop) => (dom[prop] = fiber.props[prop]));

  return dom;
}

function render(element, container) {
  // set the nextUnitOfWork as the root of the fiber tree
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };

  nextUnitOfWork = wipRoot;
}
