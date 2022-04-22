import { Routes, Route } from "react-router-dom";

import { MainContainer } from "../pages/mainPage/containers/MainContainer";

import { ROUTE_NAMES } from "./routeNames";

export const Router = () => {
   return (
      <Routes>
         <Route path={ROUTE_NAMES.HOME} element={<MainContainer />} />
      </Routes>
   );
};
