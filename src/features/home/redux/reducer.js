import initialState from './initialState';
import { GET_LIST_USERS_SUCCESS, GET_LIST_CHECKIN_CHECKOUT_SUCCESS } from './constants';
import { DOWNLOAD_REQUEST, DOWNLOAD_SUCCESS, DOWNLOAD_FAILURE } from './download.constants';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_LIST_CHECKIN_CHECKOUT_SUCCESS:
      return {
        ...state,
        listCheckInCheckOut: action.payload,
      };
    case DOWNLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DOWNLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    case DOWNLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.statusText,
      };
    default:
      return state;
  }
};

export default reducer;
