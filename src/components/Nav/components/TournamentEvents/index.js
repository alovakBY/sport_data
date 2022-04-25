import { useState, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import {
   NavLink,
   useNavigate,
   useParams,
   useSearchParams,
} from "react-router-dom";
import { mainPageSelector } from "../../../MainLayout/selectors";

import classes from "./TournamentEvents.module.css";

export const TournamentEvents = memo(
   ({ tournament, amount, name, id, handleSelectedTournament }) => {
      const selected_tournaments = useSelector(
         (state) => state.mainPage.selected_tournaments
      );
      const selected = selected_tournaments.find(
         (tournament) => tournament === id
      );
      // console.log(selected);
      return (
         <NavLink
            to="tournaments"
            className={classes.link}
            onClick={() => handleSelectedTournament(id)}
         >
            <label className={classes.label}>
               <div>
                  <span className={classes.tournament}>{name}</span>
                  <span className={classes.amount}>({amount})</span>
               </div>
               <div className={classes.checkboxWrapper}>
                  <span
                     className={`${classes.customCheckbox} ${
                        selected && classes.activeCheckbox
                     }`}
                  ></span>
               </div>
            </label>
         </NavLink>
      );
   }
);
