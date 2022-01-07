import { useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import PostList from "./features/posts/PostList/PostList";
import AddPostForm from "./features/posts/AddPostForm/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm/EditPostForm";
import PostDetail from "./features/posts/PostDetail/PostDetail";
import UserList from "./features/users/UserList/UserList";
import Notifications from "./components/Notifications/Notifications";
import store from "./store";
import { fetchUsers } from "./features/users/userSlice";
import { worker } from "./api/server";
import "./reduxToolkit.less";

const demoPath = "/reduxToolkit";

async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: "bypass" });
}

start();

// get the users once
store.dispatch(fetchUsers());

function ReduxToolkit(props: RouteComponentProps) {
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
        <main className="app-sections scroll-bar">
          <Switch>
            <Route
              exact // to match the /posts/:postId
              path={`${demoPath}/posts`}
              component={PostList}
              key="/posts"
            />
            <Route
              path={`${demoPath}/posts/:postId`}
              component={PostDetail}
              key="/postDetail"
            />
            <Route
              path={`${demoPath}/edit/:postId`}
              component={EditPostForm}
              key="/editPostForm"
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
