import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CartItem } from "../components/CartItem";

import { MARKETS } from "../../../constants/markets";

import { UPDATE_MARKETS_IN_CART } from "../../MainLayout/actions";

import classes from "./CartContainer.module.css";
import { CartCalculator } from "../components/CartCalculator";

export const CartContainer = () => {
  const dispatch = useDispatch();
  const { events, markets_in_cart } = useSelector((state) => state.mainPage);

  const handleDeleteOutcome = useCallback(
    (id) => {
      dispatch(UPDATE_MARKETS_IN_CART({ outcome_id: id }));
    },
    [markets_in_cart]
  );

  const cart_items = useMemo(() => {
    return markets_in_cart.reduce((result, market_in_cart) => {
      const event_in_cart = events.find((event) => {
        return event.id === market_in_cart.event.id;
      });
      const event_market_in_cart = event_in_cart.markets["full_event|0"].find(
        (market) => {
          return market.id === market_in_cart.market_id;
        }
      );
      const outcome_types = Object.keys(event_market_in_cart.outcomes);
      const outcome_type = outcome_types.find((type) => {
        return (
          event_market_in_cart.outcomes[type].id === market_in_cart.outcome_id
        );
      });
      const event_name = event_in_cart.data.name;
      const market_title = MARKETS[event_market_in_cart.type].title;
      const wager_name = MARKETS[event_market_in_cart.type].name[outcome_type];
      const odd = event_market_in_cart.outcomes[outcome_type].odd;
      const data = {
        id: market_in_cart.outcome_id,
        event_name,
        market_title,
        wager_name,
        odd,
      };
      result.push(data);
      return result;
    }, []);
  }, [events, markets_in_cart]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>Bet Slip</div>
      <div>
        {cart_items.map((cart_item, index) => {
          return (
            <CartItem
              key={cart_item.id}
              cart_item={cart_item}
              position={index + 1}
              handleDeleteOutcome={handleDeleteOutcome}
            />
          );
        })}
      </div>
      {!!cart_items.length && (
        <div>
          <CartCalculator cart_items={cart_items} />
        </div>
      )}
    </div>
  );
};
