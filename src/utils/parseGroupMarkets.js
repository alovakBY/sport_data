// import { MARKETS_TITLE } from "../constants/markets";

const parseStr = (str) => {
  const chunks = str.split("|");

  const outcomes = chunks[7] ? chunks[7].split("!") : {};
  const id = chunks[0];
  const market_type = chunks[1];
  const is_active = chunks[3];
  const market_iid = chunks[10];

  // console.log(outcomes);

  const outcome = outcomes.reduce((acc, out) => {
    const outcomes_chunks = out.split("~");
    const obj = {
      group_field: outcomes_chunks[1],
      id: outcomes_chunks[0],
      iid: outcomes_chunks[7],
      type: outcomes_chunks[1],
      odd: outcomes_chunks[2].slice(0, -1),
      original_odds: outcomes_chunks[2],
      market_id: chunks[0],
      market_title: "",
      parameter: "",
    };
    const type = outcomes_chunks[3]
      ? `${outcomes_chunks[1]}/${outcomes_chunks[3]}`
      : outcomes_chunks[1];
    acc[type] = obj;
    return acc;
  }, {});

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
