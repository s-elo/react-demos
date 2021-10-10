import React, { Component } from "react";
import axios from "axios";
import PubSub from "pubsub-js";
import "./index.css";

export default class Search extends Component {
  updateState = () => {
    const {
      searchInput: { value: searchStr },
    } = this;

    // update the status
    // this.props.updateState({ isFirst: false, isLoading: true });

    PubSub.publish("status", { isFirst: false, isLoading: true });
    axios
      // using the proxy
      .get(`http://localhost:3000/leoProxy/search/users?q=${searchStr}`)
      .then(
        (res) => {
          // console.log(res.data);
          // this.props.updateState({ isLoading: false, data: res.data.items });

          PubSub.publish("status", { isLoading: false, data: res.data.items });
        },
        (err) => {
          // console.log(err);
          // this.props.updateState({ isLoading: false, err: err.message });

          PubSub.publish("status", { isLoading: false, err: err.message });
        }
      );
  };

  render() {
    return (
      <div className="search-box">
        <div className="title">Search Github Users</div>
        <input
          ref={(n) => (this.searchInput = n)}
          type="text"
          placeholder="enter the name you search"
        />
        <button onClick={this.updateState}>Search</button>
      </div>
    );
  }
}
