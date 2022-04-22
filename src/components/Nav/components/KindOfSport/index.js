import { useState, memo } from "react";

import { EventsInCountry } from "../EventsInCountry";

import arrow from "../../../../static/arrow.svg";

import classes from "./KindOfSport.module.css";

export const KindOfSport = ({ name, amount, eventsBySport }) => {
   const [isActive, setIsActive] = useState(false);

   const eventsInCountry = eventsBySport.reduce((acc, event) => {
      const country = event.data.country.name;
      acc[country]
         ? (acc[country] = [...acc[country], event])
         : (acc[country] = [event]);
      return acc;
   }, {});

   const sortEventsInCountry =
      eventsInCountry &&
      Object.keys(eventsInCountry).sort((a, b) => {
         if (eventsInCountry[a] < eventsInCountry[b]) {
            return 1;
         }
         if (eventsInCountry[a] > eventsInCountry[b]) {
            return -1;
         }
         return 0;
      });

   return (
      <div className={classes.container}>
         <div onClick={() => setIsActive(!isActive)} className={classes.button}>
            <div className={classes.left}>
               <span className={classes.name}>{name}</span>
               <span className={classes.amount}>({amount})</span>
            </div>
            <div className={classes.right}>
               <img
                  src={arrow}
                  className={`${!isActive && classes.arrowRotate}`}
               />
            </div>
         </div>
         {isActive && (
            <div>
               {sortEventsInCountry.map((country) => {
                  const amount = eventsInCountry[country].length;
                  return (
                     <EventsInCountry
                        key={country}
                        country={country}
                        amount={amount}
                        eventsInCountry={eventsInCountry[country]}
                     />
                  );
               })}
            </div>
         )}
      </div>
   );
};
