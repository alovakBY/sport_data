import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

import { CoefficientComponent } from "../CoefficientComponent";

import classes from "./TournamentEvents.module.css";

export const TournamentEvents = ({ date, eventsByDate }) => {
  const market_full_time = eventsByDate.reduce((result, event) => {
    if (event.markets["full_event|0"]) {
      result.push(...event.markets["full_event|0"]);
    }
    return result;
  }, []);

  const market_type_1x2 = market_full_time.find(
    (market) => market.type === "1x2"
  );

  const eventsContainer = eventsByDate
    .sort((a, b) => {
      if (a.data.time < b.data.time) return -1;
      if (a.data.time > b.data.time) return 1;
      return 0;
    })
    .map((event) => {
      const day = dayjs(event.data.time).format("DD.MM");
      const time = dayjs(event.data.time).format("HH:mm");
      const market =
        event.markets["full_event|0"].find((market) => {
          return market.type === "1x2";
        }) ||
        event.markets["full_event|0"].find((market) => {
          return market.type === "12";
        });
      const coefficientContainer =
        market &&
        Object.keys(market.outcomes).map((outcomeItem) => {
          const outcome = market.outcomes[outcomeItem];
          return (
            <CoefficientComponent
              key={outcome.id}
              id={outcome.id}
              value={outcome.odd}
              event={event}
            />
          );
        });
      return (
        <div key={event.id} className={classes.event}>
          <div className={classes.dateContainer}>
            <span>{day}</span>
            <span>{time}</span>
          </div>
          <NavLink
            to={`/event/${event.id}`}
            className={classes.participantsContainer}
          >
            <div className={classes.participants}>{event.data.name}</div>
            <div className={classes.league}>{event.data.tournament.name}</div>
          </NavLink>
          {market && (
            <div
              onClick={() => console.log("click")}
              className={classes.eventCoeff}
            >
              {coefficientContainer}
            </div>
          )}
        </div>
      );
    });

  return (
    <div>
      <div className={classes.dateTitleContainer}>
        <div className={`${classes.date} ${classes.title}`}>{date}</div>
        <div className={`${classes.eventTitle} ${classes.title}`}>event</div>
        <div className={`${classes.coeff} ${classes.title}`}>
          <span>1</span>
          {market_type_1x2 && <span>X</span>}
          <span>2</span>
        </div>
      </div>
      <div>{eventsContainer}</div>
    </div>
  );
};
