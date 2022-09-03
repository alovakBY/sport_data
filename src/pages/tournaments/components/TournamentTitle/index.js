import classes from "../../containers/TournamentsContainer.module.css";

export const TournamentTitle = ({ sport, tournament }) => {
  return (
    <div className={classes.tournament}>
      {sport} » {tournament}
    </div>
  );
};
