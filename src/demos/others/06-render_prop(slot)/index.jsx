import React, { Component } from "react";
import Count from '../01-setState';

export default class Parent extends Component {
  render() {
    return (
      <div>
        <div>Parent...</div>
        {/* B can be changed any other Component */}
        <A render={(name) => <B name={name}/>} />
        <A render={(name) => <Count name={name}/>} />
      </div>
    );
  }
}

class A extends Component {
  state = {
    name: "leo",
  };

  render() {
    const { name } = this.state;

    return (
      <div>
        <div>A...</div>
        {/* slot */}
        {this.props.render(name)}
      </div>
    );
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <div>B...</div>
        {this.props.name} from A
      </div>
    );
  }
}
