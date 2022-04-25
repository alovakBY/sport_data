import { combineReducers } from "redux";
import { mainPageReducer } from "../components/MainLayout/reducers";
// import { tournamentsPageReducer } from "../pages/Tournaments/reducers";

const rootReducer = combineReducers({
   mainPage: mainPageReducer,
   // tournamentsPage: tournamentsPageReducer,
});

export default rootReducer;
