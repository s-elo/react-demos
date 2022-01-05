import React, { Component } from "react";
import axios from "axios";
// import PubSub from "pubsub-js";
import { SearchProps } from "../../type";
import "./index.less";

export default class Search extends Component<SearchProps> {
  private searchInput = React.createRef<HTMLInputElement>();

  updateState = () => {
    const searchStr = this.searchInput.current!.value;

    // update the status
    this.props.updateState({ isFirst: false, isLoading: true });

    axios
      // using the proxy
      .get(`http://localhost:3000/leoProxy/search/users?q=${searchStr}`)
      .then(
        (res) => {
          // console.log(res.data);
          // PubSub.publish("status", { isLoading: false, data: res.data.items });
          this.props.updateState({ isLoading: false, data: res.data.items });
        },
        (err) => {
          // console.log(err);
          this.props.updateState({ isLoading: false, err: err.message });
        }
      );
  };

  render() {
    return (
      <div className="search-box">
        <div className="title">Search Github Users</div>
        <input
          ref={this.searchInput}
          type="text"
          placeholder="enter the name you search"
        />
        <button onClick={this.updateState}>Search</button>
      </div>
    );
  }
}
