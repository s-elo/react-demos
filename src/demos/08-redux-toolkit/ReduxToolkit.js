import { useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import PostList from "./features/posts/PostList/PostList";
import AddPostForm from "./features/posts/AddPostForm/AddPostForm";
import UserList from "./features/users/UserList/UserList";
import Notifications from "./components/Notifications/Notifications";
import store from "./store";
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
    if (pathname === demoPath) {
      history.push(`${demoPath}/posts`);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="post-container">
      <Provider store={store}>
        <Header demoPath={demoPath} />
        <main className="app-sections">
          <Switch>
            <Route
              path={`${demoPath}/posts`}
              component={PostList}
              key="/posts"
            />
            <Route
              path={`${demoPath}/addPost`}
              component={AddPostForm}
              key="/addPost"
            />
            <Route
              path={`${demoPath}/users`}
              component={UserList}
              key="/users"
            />
            <Route
              path={`${demoPath}/notifications`}
              component={Notifications}
              key="/notifications"
            />
            {/* when the above does not match */}
            <Redirect to={`${demoPath}/posts`} />
          </Switch>
        </main>
      </Provider>
    </div>
  );
}

export default withRouter(ReduxToolkit);
