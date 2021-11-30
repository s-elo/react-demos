import React, { Component } from "react";

function FunctionInput() {
  const state = {
    name: "leo",
    age: 22,
  };

  const handleInputChanged = (el: React.ChangeEvent<HTMLInputElement>) => {
    console.log(el.target.value);
  };

  return <input type="text" onChange={handleInputChanged} />;
}

class ClassInput extends Component {
  state = {
    name: "leo",
    age: 22,
  };

  handleInputChanged = (el: React.ChangeEvent<HTMLInputElement>) => {
    console.log(el.target.value);
  };

  render() {
    return <input type="text" onChange={this.handleInputChanged} />;
  }
}

export default class RefDemo extends Component {
  classInputRef = React.createRef<ClassInput>();
  // cannot use ref to get function component instance
  //   funcInputRef = React.createRef<FunctionInput>();

  componentDidMount() {
    console.log(this.classInputRef.current?.state);
  }

  render() {
    return (
      <div>
        {/* Func: <FunctionInput ref={this.funcInputRef}/> */}
        &nbsp; Class: <ClassInput ref={this.classInputRef} />
      </div>
    );
  }
}
