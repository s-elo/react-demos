import React from "react";

export default class Parent extends React.Component {
  state = {
    hasError: false,
  };

  // when the child components have errors
  // this function will be called
  // return the obj will change the state
  // it only works in production mode
  static getDerivedStateFromError(err: object) {
    console.log(err);
    return { hasError: true };
  }

  // used to stat the errors
  // and send the stats to the server
  componentDidCatch(err: object, info: object) {
    console.log(err, info);
  }

  render() {
    const { hasError } = this.state;

    return hasError ? <h4>some problems</h4> : this.props.children;
  }
}
