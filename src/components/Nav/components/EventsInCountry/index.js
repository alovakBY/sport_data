import { useState, memo } from "react";
import { TournamentEvents } from "../TournamentEvents";

import classes from "./EventsOnCountry.module.css";

export const EventsInCountry = memo(
  ({ country, amount, eventsInCountry, handleSelectedTournament }) => {
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
      return acc;
    }, {});

    const sortTournamentEvents = Object.keys(tournamentEvents).sort((a, b) => {
      if (
        tournamentEvents[a].events.length < tournamentEvents[b].events.length
      ) {
        return 1;
      }
      if (
        tournamentEvents[a].events.length > tournamentEvents[b].events.length
      ) {
        return -1;
      }
      return 0;
    });

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
            {sortTournamentEvents.map((tournamentName) => {
              const amount = tournamentEvents[tournamentName].events.length;
              return (
                <TournamentEvents
                  key={tournamentName}
                  tournament={tournamentEvents[tournamentName]}
                  amount={amount}
                  name={tournamentName}
                  id={tournamentEvents[tournamentName].id}
                  handleSelectedTournament={handleSelectedTournament}
                />
              );
            })}
          </>
        )}
      </div>
    );
  }
);
