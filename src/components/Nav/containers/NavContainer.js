import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { KindOfSport } from "../components/KindOfSport";

import { mainPageSelector } from "../../MainLayout/selectors";
import * as actions from "../../MainLayout/actions";

import classes from "./NavContainer.module.css";

export const NavContainer = memo(() => {
   const { events } = useSelector(mainPageSelector);
   const dispatch = useDispatch();

   const kindsOfSport = events.reduce((result, event) => {
      const sport = event.data.sport.name;
      result[sport] ? result[sport].push(event) : (result[sport] = [event]);
      return result;
   }, {});

   const handleSelectedTournament = useCallback((id) => {
      dispatch(actions.UPDATE_SELECTED_TOURNAMENTS(id));
   }, []);

   const sortKindsOfSportArr = Object.keys(kindsOfSport).sort(
      (prevSport, nextSport) => {
         if (kindsOfSport[prevSport].length < kindsOfSport[nextSport].length) {
            return 1;
         }
         if (kindsOfSport[prevSport].length > kindsOfSport[nextSport].length) {
            return -1;
         }
         return 0;
      }
   );

   return (
      <div className={classes.container}>
         <div className={classes.left}>
            {sortKindsOfSportArr.map((sport) => {
               const amount = kindsOfSport[sport].length;
               return (
                  <KindOfSport
                     eventsBySport={kindsOfSport[sport]}
                     key={sport}
                     sport={sport}
                     amount={amount}
                     handleSelectedTournament={handleSelectedTournament}
                  />
               );
            })}
         </div>
         <div></div>
      </div>
   );
});
