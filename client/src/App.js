import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import HomeView from "./views/HomeView";
import client from "./ApolloClient";
import NotFound from "./views/common/404";
import store from "./store";
import ApartmentView from "./views/ApartmentView";
import Locations from "./views/Locations";
import { hot } from "react-hot-loader";
import "./App.css";
import "../node_modules/antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
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
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}
//added hot reloading
export default hot(module)(App);
