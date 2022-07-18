import React, { PureComponent } from "react";
import "./index.less";

export default class Parent extends PureComponent {
  state = {
    name: "leo",
  };

  // or just use PureComponent
  // shouldComponentUpdate(nextProps, nextState) {
  //     // no change no render
  //     return !nextState.name === this.state.name;
  // }
  changeName() {
    this.setState({ name: "pit" });
    /**
     * when using PureComponent
     * the child will not render if no use the props from parent or no changed props
     * it will not watch shallow copy
     */
    // cannot use the example below!!
    // const obj = this.state;
    // obj.name = 'pit';
    // this.setState(obj);
  }

  render() {
    console.log("parent--render");
    return (
      <div className="parent">
        <div>Parent: {this.state.name}</div>
        <button onClick={this.changeName.bind(this)}>change name</button>
        <Child />
      </div>
    );
  }
}

class Child extends PureComponent {
  render() {
    console.log("child-render");
    return (
      <div className="child">
        <div>Child...</div>
      </div>
    );
  }
}
