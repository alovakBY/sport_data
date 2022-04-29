import { handleActions } from "redux-actions";

import * as actions from "../actions";
import { parseGroupMarkets } from "../../../utils/parseGroupMarkets";

const defaultState = {
  events: [],
  selected_tournaments: [],
  markets_in_cart: [],
};

export const mainPageReducer = handleActions(
  {
    [actions.SET_EVENTS]: (state, { payload }) => {
      const events = payload.map((event) => {
        return {
          ...event,
          markets: parseGroupMarkets(event.group_markets),
        };
      });
      const sortEvents = events.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
      return { ...state, events: sortEvents };
    },
    [actions.UPDATE_EVENTS]: (state, { payload }) => {
      const oldEvents = [...state.events];
      const updatedEvents = [...payload];

      const events = updatedEvents.reduce((result, updateEvent) => {
        const oldEvent = oldEvents.find((oldEv) => {
          return updateEvent.id === oldEv.id;
        });

        if (oldEvent && !updateEvent.data) {
          result.push(oldEvent);
        }
        if (oldEvent && updateEvent.data) {
          const updatedEvent = {
            ...oldEvent,
            digest_type: updateEvent.digest_type,
            data: updateEvent.data,
            group_markets: updateEvent.group_markets || oldEvent.group_markets,
            markets: updateEvent.group_markets
              ? parseGroupMarkets(updateEvent.group_markets)
              : oldEvent.markets,
          };
          result.push(updatedEvent);
        }
        if (!oldEvent) {
          const newEvent = {
            ...updateEvent,
            markets: parseGroupMarkets(updateEvent.group_markets),
          };
          result.push(newEvent);
        }
        return result;
      }, []);
      const sortEvents = events.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });

      return { ...state, events: sortEvents };
    },
    [actions.UPDATE_SELECTED_TOURNAMENTS]: (state, { payload }) => {
      const copy = [...state.selected_tournaments];
      const id = payload;
      const selected_tournament = state.selected_tournaments.findIndex(
        (active_id) => {
          return id === active_id;
        }
      );
      if (selected_tournament === -1) {
        copy.unshift(id);
      } else {
        copy.splice(selected_tournament, 1);
      }
      return {
        ...state,
        selected_tournaments: copy,
      };
    },
    [actions.UPDATE_MARKETS_IN_CART]: (state, { payload }) => {
      const copy = [...state.markets_in_cart];
      const { outcome_id } = payload;
      const is_market_in_cart_index = state.markets_in_cart.findIndex(
        (market_in_cart) => {
          return market_in_cart.outcome_id === outcome_id;
        }
      );
      if (is_market_in_cart_index === -1) {
        copy.push(payload);
      } else {
        copy.splice(is_market_in_cart_index, 1);
      }
      return {
        ...state,
        markets_in_cart: copy,
      };
    },
  },
  defaultState
);
