import { Routes, Route } from "react-router-dom";

import { MainContainer } from "../pages/mainPage/containers/MainContainer";
import { TournamentsContainer } from "../pages/Tournaments/containers/TournamentsContainer";

import { ROUTE_NAMES } from "./routeNames";

export const Router = () => {
   return (
      <Routes>
         <Route path={ROUTE_NAMES.HOME} element={<MainContainer />} />
         <Route
            path={ROUTE_NAMES.TOURNAMENTS}
            element={<TournamentsContainer />}
         />
      </Routes>
   );
};
