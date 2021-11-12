import React, { Component } from "react";

type StateType = { count: number };
type PropType = { name: string };

export default class Demo extends Component<PropType, StateType> {
  state = {
    count: 0,
  };

  add() {
    // note that setState is async!
    // you can get the updated state in the callback

    //#region first use of setState

    // const { count } = this.state;
    // this.setState(
    //   {
    //     count: count + 1,
    //   },
    //   () => {
    //     console.log("async:", this.state.count);
    //   }
    // );
    //#endregion

    // second use:
    // when the updated state needs to use the previous one, recommand this
    this.setState(
      (state, props) => {
        return { count: state.count + 1 };
      },
      () => {
        console.log("async:", this.state.count);
      }
    );

    console.log("sync:", this.state.count);
  }
  render() {
    return (
      <div>
        <div>Count name: {this.props.name}</div>
        <div>count: {this.state.count}</div>
        <button onClick={this.add.bind(this)}>+</button>
      </div>
    );
  }
}
