import { memo, useState } from "react";

import classes from "./CartCalculator.module.css";

export const CartCalculator = memo(({ cart_items }) => {
  const [perBet, setPerBet] = useState("");
  const total_odds = cart_items.reduce((acc, { odd }) => (acc += +odd), 0);
  const potentialPayout = total_odds * +perBet;
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div className={classes.totalOdds}>
          <span className={classes.totalOddsTitle}>Total Odds:</span>
          <span>{total_odds}</span>
        </div>
        <div className={classes.totalStake}>
          <span className={classes.totalStakeTitle}>Total Stake:</span>
          <span>{perBet || "0"}</span>
        </div>
      </div>
      <div className={classes.bottomItem}>
        <span>Number Of Bets:</span>
        <span className={classes.bottomItemPadding}>{cart_items.length}</span>
      </div>
      <div className={classes.bottomItem}>
        <span>Total Stake:</span>
        <span>
          <input
            type="number"
            autoComplete="off"
            value={perBet}
            onChange={(e) => setPerBet(e.target.value)}
          />
        </span>
      </div>
      <div className={classes.bottomItem}>
        <span>Potential Payout:</span>
        <span className={classes.bottomItemPadding}>{potentialPayout}</span>
      </div>
    </div>
  );
});
