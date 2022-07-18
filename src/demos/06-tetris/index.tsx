import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import GamePannel from "./components/GamePannel/GamePannel";
import ControlPannel from "./components/ControlPannel/ControlPannel";

export default function Tetris() {
  return (
    <Provider store={store}>
      <main className="main-wrapper">
        <GamePannel />
        <ControlPannel />
      </main>
    </Provider>
  );
}
