import React, { Component } from "react";
import Count from "../01-setState/setState";

type APropType = {
  render: (name: string) => React.ComponentElement<BPropType, any>;
};

type BPropType = {
  name: string;
};

export default class Parent extends Component {
  // use the concrete function to declare instead of anominous func
  renderBFunc = (name: string) => {
    return <B name={name} />;
  };

  renderCountFunc = (name: string) => {
    return <Count name={name} />;
  };

  render() {
    return (
      <div>
        <div>Parent...</div>
        {/* the render prop can be changed to another name */}
        <A render={this.renderBFunc} />
        <A render={this.renderCountFunc} />
      </div>
    );
  }
}

class A extends Component<APropType> {
  state = {
    name: "leo",
  };

  render() {
    const { name } = this.state;

    return (
      <div>
        <div>A...</div>
        {/* slot, this area can be customized by the parent */}
        {this.props.render(name)}
      </div>
    );
  }
}

class B extends Component<BPropType> {
  render() {
    return (
      <div>
        <div>B...</div>
        {this.props.name} from A
      </div>
    );
  }
}
