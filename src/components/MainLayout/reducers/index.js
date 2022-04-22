import { handleActions } from "redux-actions";

import * as actions from "../actions";
import { parseGroupMarkets } from "../../../utils/parseGroupMarkets";
import { getEventsByTournaments } from "../../../utils/getEventsByTournaments";

const defaultState = {
   events: [],
   tournaments: null,
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
         const tournaments = events.reduce((result, event) => {
            const tournament_name = event.data.tournament.name;
            result[tournament_name]
               ? (result[tournament_name] = {
                    ...result[tournament_name],
                    events: [...result[tournament_name].events, event],
                 })
               : (result[tournament_name] = {
                    tournament_name,
                    tournament_id: event.data.tournament.id,
                    sport: event.data.sport.name,
                    country: event.data.country.name,
                    isSelected: false,
                    events: [event],
                 });
            return result;
         }, {});
         return { ...state, events, tournaments };
      },
      [actions.UPDATE_EVENTS]: (state, { payload }) => {
         // console.log(payload);
         // const oldEventsTournament = [...state.tournaments];
         const oldEvents = [...state.events];
         const updatedEvents = [...payload];

         // здесь мы обновляем стейт по турнирам

         // заканчиваем обновлять стейт

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
               console.log(updatedEvent);
               result.push(updatedEvent);
            }
            if (!oldEvent) {
               const newEvent = {
                  ...updateEvent,
                  markets: parseGroupMarkets(updateEvent.group_markets),
               };
               // console.log(newEvent);
               result.push(newEvent);
            }
            return result;
         }, []);
         const tournaments = getEventsByTournaments(events);
         // console.log(events);
         return { ...state, events, tournaments };
      },
   },
   defaultState
);
