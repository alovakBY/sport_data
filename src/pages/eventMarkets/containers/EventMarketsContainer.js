import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Market } from "../components/Market";

import * as actions from "../../../components/MainLayout/actions";

import classes from "./EventMarketsContainer.module.css";

export const EventMarketsContainer = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.mainPage.events);
  const { id } = useParams();

  const handleToggleCart = ({ outcome_id, market_id, event }) => {
    dispatch(
      actions.UPDATE_MARKETS_IN_CART({
        outcome_id,
        market_id,
        event,
      })
    );
  };

  const selectedEvent = useMemo(() => {
    return events.find((event) => {
      return event.id === id;
    });
  }, [events, id]);

  const markets = selectedEvent ? selectedEvent.markets["full_event|0"] : [];

  return (
    <div className={classes.container}>
      {markets.map((market) => {
        return (
          <Market
            event={selectedEvent}
            key={market.id}
            market={market}
            handleToggleCart={handleToggleCart}
          />
        );
      })}
    </div>
  );
};
