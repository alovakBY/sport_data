const parseStr = (str) => {
   const chunks = str.split("|");

   const outcomes = chunks[7] ? chunks[7].split("!") : {};

   // console.log(outcomes);

   const outcome = outcomes.reduce((acc, out) => {
      const outcomes_chunks = out.split("~");
      const obj = {
         group_field: outcomes_chunks[1],
         id: outcomes_chunks[0],
         iid: outcomes_chunks[7],
         type: outcomes_chunks[1],
         odd: outcomes_chunks[2],
         original_odds: outcomes_chunks[2],
         market_id: chunks[0],
      };
      acc[outcomes_chunks[1]] = obj;
      return acc;
   }, {});

   // console.log(outcome);

   const id = chunks[0];
   const market_type = chunks[1];
   const is_active = chunks[3];
   const market_iid = chunks[10];

   return {
      id,
      iid: market_iid,
      type: market_type,
      is_active,
      outcomes: outcome,
   };
};

export const parseGroupMarkets = (obj) => {
   const marketsObj = Object.keys(obj).reduce((acc, key) => {
      const arr = obj[key].map((marketString) => parseStr(marketString));
      acc[key] = arr;
      return acc;
   }, {});

   return marketsObj;
};
