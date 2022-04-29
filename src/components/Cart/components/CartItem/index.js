import close_outcome from "../../../../static/close_outcome.svg";

import classes from "./CartItem.module.css";

export const CartItem = ({ cart_item, position, handleDeleteOutcome }) => {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.position}>{position}</div>
        <div className={classes.participant}>{cart_item.event_name}</div>
        <div className={classes.left_bottom}>
          <div>
            <div className={classes.market_title}>{cart_item.market_title}</div>
            <div className={classes.wager}>Wager: {cart_item.wager_name}</div>
          </div>
          <div className={classes.odd}>{cart_item.odd}</div>
        </div>
      </div>
      <div
        className={classes.close}
        onClick={() => handleDeleteOutcome(cart_item.id)}
      >
        <img src={close_outcome} alt="close" />
      </div>
    </div>
  );
};
