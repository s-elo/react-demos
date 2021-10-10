import React, { Component } from "react";

export default class News extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push(`/home/message`);
    }, 2000);
  }

  render() {
    return <div>News content...jump to message after 2s...</div>;
  }
}
