import { useState, memo } from "react";
import { TournamentEvents } from "../TournamentEvents";

import classes from "./EventsOnCountry.module.css";

export const EventsInCountry = ({ country, amount, eventsInCountry }) => {
   const [isActive, setIsActive] = useState(false);

   const tournamentEvents = eventsInCountry.reduce((acc, event) => {
      const tournament = event.data.tournament.name;
      const id = event.data.tournament.id;
      if (acc[tournament]) {
         acc[tournament] = {
            ...acc[tournament],
            events: [...acc[tournament].events, event],
         };
      } else {
         acc[tournament] = { id, events: [event] };
      }
      // acc[id] ? (acc[id] = [...acc[id], event]) : (acc[id] = [event]);
      return acc;
   }, {});

   // tournamentEvents.events && console.log(sortTournamentEvents);

   // const sortTournamentEvents =
   //    tournamentEvents.events &&
   //    tournamentEvents.events.sort((a, b) => {
   //       if (tournamentEvents.events[a] < tournamentEvents.events[b]) {
   //          return 1;
   //       }
   //       if (tournamentEvents.events[a] > tournamentEvents.events[b]) {
   //          return -1;
   //       }
   //       return 0;
   //    });

   return (
      <div className={classes.container}>
         <button
            className={classes.button}
            onClick={() => setIsActive(!isActive)}
         >
            <span className={classes.country}>{country}</span>
            <span className={classes.amount}>({amount})</span>
         </button>
         {isActive && (
            <>
               {Object.keys(tournamentEvents).map((tournamentName) => {
                  const amount = tournamentEvents[tournamentName].events.length;
                  console.log(tournamentEvents[tournamentName]);
                  return (
                     <TournamentEvents
                        key={tournamentName}
                        tournament={tournamentEvents[tournamentName]}
                        amount={amount}
                        name={tournamentName}
                        id={tournamentEvents[tournamentName].id}
                     />
                  );
               })}
            </>
         )}
      </div>
   );
};
