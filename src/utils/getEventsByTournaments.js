export const getEventsByTournaments = (events, tournaments) => {
   // console.log(tournaments);
   return events.reduce(
      (result, event) => {
         const tournament_name = event.data.tournament.name;
         const tournament_id = event.data.tournament.id;
         result[tournament_id]
            ? (result[tournament_id] = {
                 ...result[tournament_id],
                 events: [...result[tournament_id].events, event],
              })
            : (result[tournament_id] = {
                 tournament_id,
                 tournament_name: event.data.tournament.name,
                 sport: event.data.sport.name,
                 country: event.data.country.name,
                 isSelected: false,
                 events: [event],
              });
         return result;
      },
      { ...tournaments }
   );
};
