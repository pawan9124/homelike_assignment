import { FETCH_LOCATIONS_LIST, FETCH_APARTMENTS_LIST } from "./types";
import gql from "graphql-tag";
import client from "./../ApolloClient";

export const fetchLocationsList = () => dispatch => {
  client
    .query({
      query: gql`
        {
          locations(active: true) {
            items {
              _id
              title
            }
          }
        }
      `
    })
    .then(locations => {
      console.log("LOCATIONS", locations);
      dispatch({
        type: FETCH_LOCATIONS_LIST,
        payload: locations.data
      });
    });
};

export const fetchApartmentByLocation = _id => dispatch => {
  client
    .query({
      query: gql`
        {
          apartments(location:"${_id}") {
            items {
              _id
              owner {
                _id
                email
                profile {
                  firstName
                  lastName
                  role
                }
              }
              title
              location {
                title
              }
              size
              price
              amenities
              images
              details {
                rooms
                bedrooms
                floor
                bathrooms
              } 
              services 
            }
          }
        }
      `
    })
    .then(apartments => {
      console.log("Apartments", apartments);
      dispatch({
        type: FETCH_APARTMENTS_LIST,
        payload: apartments.data
      });
    });
};
