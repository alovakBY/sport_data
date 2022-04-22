import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { KindOfSport } from "../components/KindOfSport";

import { mainPageSelector } from "../../MainLayout/selectors";

import classes from "./NavContainer.module.css";

export const NavContainer = () => {
   // const [selectedTournaments, setselectedTournaments] = useState([]);
   const { events } = useSelector(mainPageSelector);

   // const obj = useMemo(() => {
   //    getNavStructure(events);
   // }, [events]);

   // console.log(obj);

   const kindsOfSport = events.reduce((acc, event) => {
      const kindOfSport = event.data.sport.name;
      acc[kindOfSport]
         ? (acc[kindOfSport] = [...acc[kindOfSport], event])
         : (acc[kindOfSport] = [event]);
      return acc;
   }, {});

   const sortKindsOfSportArr =
      kindsOfSport &&
      Object.keys(kindsOfSport).sort((a, b) => {
         if (kindsOfSport[a] < kindsOfSport[b]) {
            return 1;
         }
         if (kindsOfSport[a] > kindsOfSport[b]) {
            return -1;
         }
         return 0;
      });

   return (
      <div className={classes.container}>
         <div className={classes.left}>
            {kindsOfSport &&
               sortKindsOfSportArr.map((kind) => {
                  const amount = kindsOfSport[kind].length;
                  return (
                     <KindOfSport
                        eventsBySport={kindsOfSport[kind]}
                        key={kind}
                        name={kind}
                        amount={amount}
                     />
                  );
               })}
         </div>
         <div></div>
      </div>
   );
};
