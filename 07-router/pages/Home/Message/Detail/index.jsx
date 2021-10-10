import React, { Component } from "react";

export default class Detail extends Component {
  queryHandle = (queryStr) => {
    // remove the ? and split by &
    const paramsArr = queryStr.slice(1).split("&");

    const obj = {};

    for (const val of paramsArr) {
      const [key, value] = val.split("=");
      obj[key] = value.replace("%20", " ");
    }

    return obj;
  };

  render() {
    const detailData = [
      { id: 1, content: "leoleoleo" },
      { id: 2, content: "leoleo" },
      { id: 3, content: "leo" },
    ];

    // param way
    // const { id, title } = this.props.match.params;

    // search way, need to parse ?id=xxx&title=xxx to obj
    // const { id, title } = this.queryHandle(this.props.location.search);

    // state way
    const { id, title } = this.props.location.state;

    const content = detailData.find((detail) => {
      return detail.id === parseInt(id);
    }).content;

    return (
      <div>
        <p>ID: {id}</p>
        <p>Tilte: {title}</p>
        <p>Content: {content}</p>
      </div>
    );
  }
}
