import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import HomeView from "./views/HomeView";
import client from "./ApolloClient";
import store from "./store";
import ApartmentView from "./views/ApartmentView";
import { hot } from "react-hot-loader";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <div>
              <Route exact path="/" component={HomeView} />
              <Route
                exact
                path="/apartments/:apartmentId"
                component={ApartmentView}
              />
            </div>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default hot(module)(App);
