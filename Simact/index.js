const rootDom = document.querySelector("#root");

// const element = React.createElement("div", null, "div created by raw React");
const element = <div>div created by JSX</div>;
ReactDOM.render(element, rootDom);

const Simact = {
  createElement,
};

Simact.createElement();

function createElement(tagName = "div", props = {}, ...children) {
  console.log("created");
}
