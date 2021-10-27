import React, { Component } from "react";

// create a context
const MyContext = React.createContext();
const { Provider, Consumer } = MyContext;

export default class Grand extends Component {
  state = {
    name: "leo",
    age: 22,
  };

  render() {
    const { name, age } = this.state;

    return (
      <div>
        <div>This is Grand component</div>
        <div>
          name: {name} --age: {age}
        </div>
        <hr />
        {/* all the childs in Provider can access the value data */}
        {/* put the value in the state will avoid render the children when the father is rendered */}
        <Provider value={this.state}>
          <Parent />
        </Provider>
      </div>
    );
  }
}

class Parent extends Component {
  render() {
    return (
      <div>
        <div>This is Parent component</div>
        <hr />
        <Child />
      </div>
    );
  }
}

class Child extends Component {
  // need to declare if want to use
  static contextType = MyContext;

  render() {
    const { name, age } = this.context;
    return (
      <div>
        <div>This is Child component</div>
        <div>
          name from Grand: {name} --age from Grand: {age}
        </div>
        <hr />
        <NextChild />
      </div>
    );
  }
}

// in function component, need to use second type context which both class and functin can use
// second type no need to declare
function NextChild() {
  return (
    <div>
      <div>This is NextChild component</div>
      <div>
        <Consumer>
          {
            // value is the this.context
            (value) =>
              `name from Grand: ${value.name} --age from Grand: ${value.age}`
          }
        </Consumer>
      </div>
    </div>
  );
}
