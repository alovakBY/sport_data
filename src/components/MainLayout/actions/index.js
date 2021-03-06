import { createAction } from "redux-actions";

export const SET_EVENTS = createAction("SET_EVENTS");
export const UPDATE_EVENTS = createAction("UPDATE_EVENTS");

export const UPDATE_SELECTED_TOURNAMENTS = createAction(
  "UPDATE_SELECTED_TOURNAMENTS"
);

export const UPDATE_MARKETS_IN_CART = createAction("UPDATE_MARKETS_IN_CART");
