import React from "react";
import {
  Link,
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import Ops from "@/component/Ops";

import "./index.less";
import { Demo } from "@/menuconfig";

type Props = {
  items: Array<Demo>;
  linkStyle: {
    [Props: string]: string;
  };
  menuPath: string;
};

class Menu extends React.Component<RouteComponentProps & Props> {
  toMenu() {
    const { history, menuPath } = this.props;

    history.push(menuPath);
  }

  render() {
    const { items, linkStyle } = this.props;
    const menuPath = this.props.menuPath === "/" ? "" : this.props.menuPath;

    return (
      <div className="body">
        <Switch>
          <Route path={`${this.props.menuPath}`} exact>
            <div className="menu">
              {items.map((item, index) => (
                <div className="menu-item" key={`${menuPath}${item.path}`}>
                  <div className="menu-order">{index + 1}</div>
                  <Link style={linkStyle} to={`${menuPath}${item.path}`}>
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </Route>
          {items.map((item) =>
            !Array.isArray(item.component) ? (
              <Route
                path={`${menuPath}${item.path}`}
                key={`${menuPath}${item.path}`}
              >
                <div className="demo-area">
                  <div className="demo-content">
                    {React.createElement(item.component)}
                  </div>
                  <div
                    className="back-to-menu"
                    onClick={this.toMenu.bind(this)}
                    title="back to menu"
                  >
                    ⬅
                  </div>
                </div>
              </Route>
            ) : (
              <Route
                key={`${menuPath}${item.path}`}
                path={`${menuPath}${item.path}`}
              >
                <div className="demo-area">
                  <div className="demo-content">
                    {React.createElement(withRouter(Menu), {
                      items: item.component,
                      linkStyle,
                      menuPath: `${menuPath}${item.path}`,
                    })}
                  </div>
                  <div
                    className="back-to-menu"
                    onClick={this.toMenu.bind(this)}
                    title="back to menu"
                  >
                    ⬅
                  </div>
                </div>
              </Route>
            )
          )}
          <Route path="/ops" component={Ops} exact />
          {/* when the above does not match */}
          <Redirect to="/ops" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Menu);
