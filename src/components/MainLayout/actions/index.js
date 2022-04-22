import { createAction } from "redux-actions";

export const SET_EVENTS = createAction("SET_EVENTS");
export const UPDATE_EVENTS = createAction("UPDATE_EVENTS");

export const SET_SELECTED_TOURNAMENT = createAction("SET_SELECTED_TOURNAMENT");
export const DELETE_SELECTED_TOURNAMENT = createAction(
   "DELETE_SELECTED_TOURNAMENT"
);
