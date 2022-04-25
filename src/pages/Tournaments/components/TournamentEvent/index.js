// import classes from "./TournamentEvent.module.css";

// export const TournamentEvent = ({ event }) => {
//    const day = dayjs(event.data.time).format("DD.MM");
//    const time = dayjs(event.data.time).format("HH:mm");

//    const markets = event.markets["full_event|0"];

//    const market = markets.find((market) => {
//       return market.type === "1x2";
//    });

//    console.log(market.outcomes);

//    return (
//       <div className={classes.event}>
//          <div className={classes.dateContainer}>
//             <span>{day}</span>
//             <span>{time}</span>
//          </div>
//          <div className={classes.participantsContainer}>
//             <div className={classes.participants}>{event.data.name}</div>
//             <div className={classes.league}>{event.data.tournament.name}</div>
//          </div>
//       </div>
//    );
// };
