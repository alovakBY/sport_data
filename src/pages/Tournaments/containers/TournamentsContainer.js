import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { TournamentTitle } from "../components/TournamentTitle";
import { TournamentEvents } from "../components/TournamentEvents";

import { mainPageSelector } from "../../../components/MainLayout/selectors";

import classes from "./TournamentsContainer.module.css";

export const TournamentsContainer = () => {
  const { selected_tournaments, events } = useSelector(mainPageSelector);

  const tournaments_object_empty = selected_tournaments.reduce(
    (result, tournament) => {
      result[tournament] = {};
      return result;
    },
    {}
  );

  const tournaments = events.reduce((result, event) => {
    const id = event.data.tournament.id;
    if (result[id]) {
      result[id].events
        ? (result[id].events = [...result[id].events, event])
        : (result[id] = {
            tournament_id: event.data.tournament.id,
            tournament_name: event.data.tournament.name,
            sport: event.data.sport.name,
            events: [event],
          });
    }
    return result;
  }, tournaments_object_empty);

  const markup = selected_tournaments.map((tournament_id) => {
    const events = tournaments[tournament_id].events;

    const eventsByDate = events.reduce((result, event) => {
      const date = dayjs(event.data.time).format("DD.MM.YYYY");
      result[date] ? result[date].push(event) : (result[date] = [event]);
      return result;
    }, {});

    const sortEventsByDate = Object.keys(eventsByDate).sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    return (
      <div key={tournament_id} className={classes.container}>
        <TournamentTitle
          sport={tournaments[tournament_id].sport}
          tournament={tournaments[tournament_id].tournament_name}
        />
        {sortEventsByDate.map((dateItem) => {
          return (
            //? подумать над ключом
            <TournamentEvents
              key={dateItem}
              eventsByDate={eventsByDate[dateItem]}
              date={dateItem}
            />
          );
        })}
      </div>
    );
  });

  return <div>{markup}</div>;
};
