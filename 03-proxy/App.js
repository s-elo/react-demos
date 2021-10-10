import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  getData = () => {
    // proxy server
    // leoProxy is used to fine the corresponding proxy
    // when there are multiple proxys
    axios.get(`http://localhost:3000/leoProxy/testData`).then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.log("error!", err);
      }
    );
  };

  render() {
    return (
      <div>
        <button onClick={this.getData}>Get data</button>
      </div>
    );
  }
}
