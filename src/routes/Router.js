import { Routes, Route } from "react-router-dom";

import { MainContainer } from "../pages/mainPage/containers/MainContainer";
import { TournamentsContainer } from "../pages/tournaments/containers/TournamentsContainer";
import { EventMarketsContainer } from "../pages/eventMarkets/containers/EventMarketsContainer";

import { ROUTE_NAMES } from "./routeNames";

export const Router = () => {
   return (
      <Routes>
         <Route path={ROUTE_NAMES.HOME} element={<MainContainer />} />
         <Route
            path={ROUTE_NAMES.TOURNAMENTS}
            element={<TournamentsContainer />}
         />
         <Route
            path={ROUTE_NAMES.EVENT_MARKETS}
            element={<EventMarketsContainer />}
         />
      </Routes>
   );
};
