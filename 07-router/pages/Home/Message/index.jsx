import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MyNavLink from "../../../component/MyNavLink";

import Detail from "./Detail";

export default class Message extends Component {
  pushRoute = (id, title) => {
    this.props.history.push(`/home/message/detail`, { id: id, title: title });
  };

  replaceRoute = (id, title) => {
    this.props.history.replace(`/home/message/detail`, {
      id: id,
      title: title,
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  goForward = () => {
    this.props.history.goForward();
  };

  render() {
    const data = [
      { id: 1, title: "leo meaasge" },
      { id: 2, title: "pit meaasge" },
      { id: 3, title: "gig meaasge" },
    ];

    return (
      <div>
        <div>Message content</div>
        <ul>
          {data.map((val) => {
            return (
              <li key={val.id}>
                {/* params way */}
                {/* <MyNavLink to={`/home/message/detail/${val.id}/${val.title}`}>
                  {val.title}
                </MyNavLink> */}

                {/* search way */}
                {/* <MyNavLink
                  to={`/home/message/detail/?id=${val.id}&title=${val.title}`}
                >
                  {val.title}
                </MyNavLink> */}

                {/* state way */}
                <MyNavLink
                  replace={true}
                  to={{
                    pathname: "/home/message/detail",
                    state: { id: val.id, title: val.title },
                  }}
                >
                  {val.title}
                </MyNavLink>

                <button onClick={() => this.pushRoute(val.id, val.title)}>
                  push way
                </button>
                <button onClick={() => this.replaceRoute(val.id, val.title)}>
                  replace way
                </button>
              </li>
            );
          })}
        </ul>
        <hr />
        {/* param way */}
        {/* <Route
          path="/home/message/detail/:id/:title"
          component={Detail}
        ></Route> */}

        {/* search way and state way, no need to match the params*/}
        <Switch>
          <Route path="/home/message/detail" component={Detail}></Route>
          <Redirect
            to={{
              pathname: "/home/message/detail",
              state: { id: 1, title: "leo meaasge" },
            }}
          />
        </Switch>

        <button onClick={this.goBack}>go back</button>
        <button onClick={this.goForward}>go forward</button>
      </div>
    );
  }
}
