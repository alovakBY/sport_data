import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { CartContainer } from "../Cart/containers/CartContainer";
import { NavContainer } from "../Nav/containers/NavContainer";

import * as actions from "./actions";

import classes from "./MainLayout.module.css";

const ws = new WebSocket(
  "wss://srv.kralbet.com/sport/?EIO=3&transport=websocket"
);

export const MainLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    ws.onopen = () => {
      ws.send(
        '42["subscribe-PreliveEvents",{"market_group":"prelive","locale":"tr_TR"}]'
      );
    };
    ws.onmessage = (e) => {
      if (e.data === "2") {
        ws.send("2");
      }
      if (e.data.startsWith("42")) {
        const arrayDataParse = JSON.parse(e.data.substr(2));
        const data = arrayDataParse[1];
        if (data.digest_type === "init") {
          dispatch(actions.SET_EVENTS(data.events));
        }
        if (data.digest_type === "diff") {
          dispatch(actions.UPDATE_EVENTS(data.events));
        }
      }
    };
  }, []);

  return (
    <div className={classes.container}>
      <NavContainer />
      <>{children}</>
      <CartContainer />
    </div>
  );
};
