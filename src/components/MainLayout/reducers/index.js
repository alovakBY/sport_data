import { handleActions } from "redux-actions";

import * as actions from "../actions";
import { parseGroupMarkets } from "../../../utils/parseGroupMarkets";
import { getEventsByTournaments } from "../../../utils/getEventsByTournaments";

const defaultState = {
   events: [],
   selected_tournaments: [],
};

export const mainPageReducer = handleActions(
   {
      [actions.SET_EVENTS]: (state, { payload }) => {
         console.log(payload);
         //  закончили стейт по турнирам
         const events = payload.map((event) => {
            return {
               ...event,
               markets: parseGroupMarkets(event.group_markets),
            };
         });
         // ! Нужно ли это?
         const sortEvents = events.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
         });
         return { ...state, events: sortEvents /* , tournaments  */ };
      },
      [actions.UPDATE_EVENTS]: (state, { payload }) => {
         const oldEvents = [...state.events];
         // const oldTournaments = { ...state.tournaments };
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
                  group_markets:
                     updateEvent.group_markets || oldEvent.group_markets,
                  markets: updateEvent.group_markets
                     ? parseGroupMarkets(updateEvent.group_markets)
                     : oldEvent.markets,
               };
               // console.log(updatedEvent);
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

         // const tournaments_without_events = Object.keys(oldTournaments).reduce(
         //    (result, tournament) => {
         //       result[tournament] = {
         //          ...oldTournaments[tournament],
         //          events: [],
         //       };
         //       return result;
         //    },
         //    {}
         // );

         // const tournaments = getEventsByTournaments(
         //    events,
         //    tournaments_without_events
         // );
         const sortEvents = events.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
         });

         return { ...state, events: sortEvents };
      },
      [actions.UPDATE_SELECTED_TOURNAMENTS]: (state, { payload }) => {
         // console.log(payload);
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
   },
   defaultState
);
