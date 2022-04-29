import { memo } from "react";
import { useSelector } from "react-redux";
import { MARKETS } from "../../../../constants/markets";

import classes from "./Market.module.css";

export const Market = memo(({ event, market, handleToggleCart }) => {
  const markets_in_cart = useSelector(
    (state) => state.mainPage.markets_in_cart
  );

  return (
    <div>
      <div className={classes.marketTitle}>{MARKETS[market.type].title}</div>
      <div style={{ display: "flex", padding: "10px 0px" }}>
        {MARKETS[market.type] &&
          MARKETS[market.type].order.map((marketType) => {
            const id = market.outcomes[marketType].id;
            const odd = market.outcomes[marketType].odd;
            const name = MARKETS[market.type].name[marketType];
            const isInCart = markets_in_cart.findIndex(
              (marketInCart) => marketInCart.outcome_id === id
            );
            return (
              <span
                key={id}
                className={`${classes.coeffWrapper} ${
                  isInCart !== -1 && classes.inCart
                }`}
                onClick={() => {
                  handleToggleCart({
                    outcome_id: id,
                    market_id: market.id,
                    event,
                  });
                }}
              >
                <span className={classes.marketType}>{name}</span>
                <span className={classes.coeff}>{odd}</span>
              </span>
            );
          })}
      </div>
    </div>
  );
});
