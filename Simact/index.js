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

const Simact = {
  createElement,
  render
};

const element = Simact.createElement(
  "div",
  { id: "Text" },
  Simact.createElement("h1", null, "title"),
  Simact.createElement("p", null, "text")
);

Simact.render(element, rootDom);

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

function render(element, container) {
  console.log(element);
}
