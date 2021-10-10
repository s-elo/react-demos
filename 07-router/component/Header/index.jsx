import React, { Component } from "react";
// withRouter can provide the history API to non-route components
import { withRouter } from "react-router-dom";

class Header extends Component {
  goBack = () => {
    this.props.history.goBack();
  };

  goForward = () => {
    this.props.history.goForward();
  };

  render() {
    return (
      <div>
        <div className="header">Fixed Header</div>
        <hr />
        router operations in common component using withRouter
        <button onClick={this.goBack}>go back</button>
        <button onClick={this.goForward}>go forward</button>
        <hr />
      </div>
    );
  }
}

export default withRouter(Header);
