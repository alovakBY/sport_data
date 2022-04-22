import { useState, memo } from "react";
import { useSelector } from "react-redux";
import { mainPageSelector } from "../../../MainLayout/selectors";

import classes from "./TournamentEvents.module.css";

export const TournamentEvents = ({ tournament, amount, name, id }) => {
   const [checked, setChecked] = useState(false);
   const { selectedTournaments } = useSelector(mainPageSelector);

   console.log(selectedTournaments);

   const handleClick = (e) => {
      e.preventDefault();
      setChecked(!checked);
      console.log(id);
   };

   return (
      <div onClick={(e) => handleClick(e)}>
         <label className={classes.label}>
            <div>
               <span className={classes.tournament}>{name}</span>
               <span className={classes.amount}>({amount})</span>
            </div>
            <div className={classes.checkboxWrapper}>
               <input
                  className={classes.input}
                  type="checkbox"
                  checked={checked}
               />
               <span className={classes.customCheckbox}></span>
            </div>
         </label>
      </div>
   );
};
