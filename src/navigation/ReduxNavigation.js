import { createStore, applyMiddleware } from "redux";
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import { Provider, connect } from "react-redux";
import React from "react";
import { rootReducer } from "../reducers";
import Drawer from "./Routes";

const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const App = createReduxContainer(Drawer);

const mapStateToProps = state => ({
  state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(rootReducer, applyMiddleware(middleware));

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
