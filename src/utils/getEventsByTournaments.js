export const getEventsByTournaments = (events) => {
   return events.reduce((result, event) => {
      const tournament_name = event.data.tournament.name;
      result[tournament_name]
         ? (result[tournament_name] = {
              ...result[tournament_name],
              events: [...result[tournament_name].events, event],
           })
         : (result[tournament_name] = {
              tournament_name,
              tournament_id: event.data.tournament.id,
              sport: event.data.sport.name,
              country: event.data.country.name,
              isSelected: false,
              events: [event],
           });
      return result;
   }, {});
};
