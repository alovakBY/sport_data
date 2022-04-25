import { handleActions } from "redux-actions";

import * as actions from "../actions";

const defaultState = {
   activeTournaments: [],
};

export const tournamentsPageReducer = handleActions(
   {
      [actions.SET_ACTIVE_TOURNAMENT]: (state, { payload }) => {
         console.log(payload);
         return state;
      },
      [actions.DELETE_ACTIVE_TOURNAMENT]: (state, { payload }) => {
         console.log(payload);
         return state;
      },
   },
   defaultState
);
