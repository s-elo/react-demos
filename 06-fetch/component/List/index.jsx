import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.css";

export default class List extends Component {
  state = {
    data: [],
    isFirst: true,
    isLoading: false,
    err: "",
  };

  componentDidMount() {
    this.token = PubSub.subscribe("status", (_, status) => {
      this.setState(status);
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  render() {
    const { data, isFirst, isLoading, err } = this.state;

    return (
      <div className="list-box">
        {isFirst ? (
          <h2>Welcome!</h2>
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : err ? (
          <h2 style={{ color: "red" }}>{err}</h2>
        ) : (
          data.map((val) => {
            return (
              <div className="item" key={val.login}>
                <a href={val.html_url}>
                  <img src={val.avatar_url} alt="avatar" />
                </a>
                <div className="desc">{val.login}</div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
