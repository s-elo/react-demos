import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import GamePannel from "./components/GamePannel";
export default function Tetris() {
  return (
    <Provider store={store}>
      <GamePannel />
    </Provider>
  );
}
