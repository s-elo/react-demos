// import CountUI from "../../component/Count";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  incrementAction,
  decrementAction,
  incrementAsyncAction,
} from "../../redux/actions/count";

// put the UI component in the same file
class Count extends Component {
  state = {
    step: 1,
  };

  stateChange = (event) => {
    const { value } = event.target;
    this.setState({
      step: value * 1,
    });
  };

  add = () => {
    const { step } = this.state;

    // from the container
    this.props.add(step);
  };

  sub = () => {
    const { step } = this.state;

    this.props.sub(step);
  };

  addIfOdd = () => {
    const { step } = this.state;
    const { count, add } = this.props;

    if (count % 2 === 0) {
      return;
    }

    add(step);
  };

  addAsync = () => {
    const { step } = this.state;

    // async action
    this.props.asyncAdd(step, 1000);
  };

  render() {
    return (
      <div className="box">
        <h2 className="count-show">
          SUM: {this.props.count} --- person number: {this.props.personNum}
        </h2>
        <select onChange={this.stateChange}>
          <option select="1">1</option>
          <option select="2">2</option>
          <option select="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.add}>+</button>&nbsp;
        <button onClick={this.sub}>-</button>&nbsp;
        <button onClick={this.addIfOdd}>+ odd</button>&nbsp;
        <button onClick={this.addAsync}>+ async</button>
      </div>
    );
  }
}
// concise version
export default connect(
  (state) => ({
    count: state.sum,
    personNum: state.persons.length,
  }),

  {
    add: incrementAction,
    sub: decrementAction,
    asyncAdd: incrementAsyncAction,
  }
)(Count);

/**
 *
 * @param {*} state in redux
 * 1. return an obj
 * 2. key is the key of the props in UI component
 * 3. used to map the states to the props...
 */
// function mapStateToProps(state) {
//   return {
//     count: state,
//   };
// }

/**
 *
 * @param {*} dispatch the actions in redux
 * 1. return an obj (must store functions (actions))
 * 2. key is the name of the fucntions, value is the functions
 * 3. used to map the actions to the props...
 */
// function mapDispatchToProps(dispatch) {
//   return {
//     add: (step) => dispatch(incrementAction(step)),
//     sub: (step) => dispatch(decrementAction(step)),
//     asyncAdd: (step, time) => dispatch(incrementAsyncAction(step, time)),
//   };
// }

// connect the container with the UI component and the redux

// export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
