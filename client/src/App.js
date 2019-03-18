import React, { Component, lazy, Suspense } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import client from "./ApolloClient";
import store from "./store";
import { hot } from "react-hot-loader";
import "./App.css";
import "../node_modules/antd/dist/antd.css";
const HomeView = lazy(() => import("./views/HomeView"));
const ApartmentView = lazy(() => import("./views/ApartmentView"));
const Locations = lazy(() => import("./views/Locations"));
const NotFound = lazy(() => import("./views/common/404"));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <div>
                <Switch>
                  <Route exact path="/" component={HomeView} />
                  <Route
                    exact
                    path="/apartments/:apartmentId"
                    component={ApartmentView}
                  />
                  <Route
                    exact
                    path="/search/:location/:locationId"
                    component={Locations}
                  />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Suspense>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}
//added hot reloading
export default hot(module)(App);
