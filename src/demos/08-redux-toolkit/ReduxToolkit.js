import React, { useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import PostList from "./components/PostList/PostList";
import UserList from "./components/UserList/UserList";
import Notifications from "./components/Notifications/Notifications";
import "./reduxToolkit.less";

const demoPath = "/reduxToolkit";

function ReduxToolkit(props) {
  // only call once
  useEffect(() => {
    const {
      history,
      location: { pathname },
    } = props;

    // only the path is /reduxToolkit
    if (pathname == demoPath) {
      history.push(`${demoPath}/posts`);
    }
  }, []);

  return (
    <div className="post-container">
      <Header demoPath={demoPath} />
      <main className="app-sections">
        <Switch>
          <Route path={`${demoPath}/posts`} component={PostList} key="/posts" />
          <Route path={`${demoPath}/users`} component={UserList} key="/users" />
          <Route
            path={`${demoPath}/notifications`}
            component={Notifications}
            key="/notifications"
          />
          {/* when the above does not match */}
          <Redirect to={`${demoPath}/posts`} />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(ReduxToolkit);
