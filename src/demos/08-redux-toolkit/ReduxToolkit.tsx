import { useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import PostList from "./features/posts/PostList/PostList";
import AddPostForm from "./features/posts/AddPostForm/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm/EditPostForm";
import PostDetail from "./features/posts/PostDetail/PostDetail";
import UserList from "./features/users/UserList/UserList";
import UserPage from "./features/users/UserPage/UserPage";
import NotificationList from "./features/notifications/NotificationList/NotificationList";
import store from "./store";
import { worker } from "./api/server";
import "./reduxToolkit.less";

const demoPath = "/reduxToolkit";

async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: "bypass" });
}

let workerStarted = false;

function ReduxToolkit(props: RouteComponentProps) {
  // only call when entering this component
  // and only call once
  if (!workerStarted) {
    start();
    workerStarted = true;
  }

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

    // when unmount, stop the worker
    // so that the conflit of HMR doesnt affect other demos
    return () => {
      worker.stop();
      workerStarted = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="post-container">
      <Provider store={store}>
        <Header demoPath={demoPath} />
        <main className="app-sections scroll-bar">
          <Switch>
            <Route
              exact // to match the /posts/:postId
              path={`${demoPath}/posts`}
              component={PostList}
              key="/posts"
            />
            <Route
              exact
              path={`${demoPath}/posts/:postId`}
              component={PostDetail}
              key="/postDetail"
            />
            <Route
              exact
              path={`${demoPath}/edit/:postId`}
              component={EditPostForm}
              key="/editPostForm"
            />
            <Route
              exact
              path={`${demoPath}/addPost`}
              component={AddPostForm}
              key="/addPost"
            />
            <Route
              exact
              path={`${demoPath}/users`}
              component={UserList}
              key="/users"
            />
            <Route
              exact
              path={`${demoPath}/users/:userId`}
              component={UserPage}
              key="/users"
            />
            <Route
              exact
              path={`${demoPath}/notifications`}
              component={NotificationList}
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
