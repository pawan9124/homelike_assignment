import { FETCH_LOCATIONS_LIST } from "./../actions/types";

const initialState = {
  location: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS_LIST:
      return {
        ...state,
        location: action.payload.locations.items
      };
    default:
      return state;
  }
};
