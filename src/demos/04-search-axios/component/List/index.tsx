import React, { Component } from "react";
// import PubSub from "pubsub-js";
import { Status } from "../../type";
import "./index.less";

export default class List extends Component<Status> {
  // when using the PubSub
  // componentDidMount() {
  //   this.token = PubSub.subscribe("status", (_, status) => {
  //     this.setState(status);
  //   });
  // }

  // componentWillUnmount() {
  //   PubSub.unsubscribe(this.token);
  // }

  // right now the state is hoisted to the father
  render() {
    const { data, isFirst, isLoading, err } = this.props;

    return (
      <div className="search-list-box">
        {isFirst ? (
          <h2>Welcome!</h2>
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : err ? (
          <h2 style={{ color: "red" }}>{err}</h2>
        ) : data ? (
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
        ) : (
          ""
        )}
      </div>
    );
  }
}
