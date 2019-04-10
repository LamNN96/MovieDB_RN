import { GET_DATA } from "../actions/databaseActions";

const initialData = {};

export function database(state = initialData, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        favorites: action.data
      };

    default:
      return state;
  }
}
