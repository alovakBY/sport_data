import { combineReducers } from "redux";
import { mainPageReducer } from "../components/MainLayout/reducers";

const rootReducer = combineReducers({
   mainPage: mainPageReducer,
});

export default rootReducer;
