import { createNavigationReducer } from "react-navigation-redux-helpers";
import { combineReducers } from "redux";
import { database } from "./dataReducers";
import Routes from "../navigation/Routes";

const navReducer = createNavigationReducer(Routes);

export const rootReducer = combineReducers({
  nav: navReducer,
  database
});
