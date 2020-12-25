import api from '../../../../common/axiosConfig';
import { request, success, failure } from '../../../../common/reduxActions';
import {
  GET_LIST_USERS_REQUEST,
  GET_LIST_USERS_SUCCESS,
  GET_LIST_USERS_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  EDIT_USER_REQUEST,
  GET_LIST_CHECKIN_CHECKOUT_REQUEST,
  GET_LIST_CHECKIN_CHECKOUT_SUCCESS,
  GET_LIST_CHECKIN_CHECKOUT_FAILURE,
} from '../constants';
import authActions from '../../../auth/redux/actions';

const getListUsers = () => {
  return (dispatch) => {
    dispatch(request(GET_LIST_USERS_REQUEST));
    return api()
      .get('users')
      .then((res) => {
        dispatch(success(GET_LIST_USERS_SUCCESS, res.data));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(GET_LIST_USERS_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const editUser = (userId, data) => {
  return (dispatch) => {
    dispatch(request(EDIT_USER_REQUEST));
    return api()
      .put('users/' + userId, data)
      .then((res) => {
        dispatch(success(EDIT_USER_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(EDIT_USER_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const lockUser = (userId) => {
  return (dispatch) => {
    dispatch(request(EDIT_USER_REQUEST));
    return api()
      .post(`users/${userId}/lock`, {})
      .then((res) => {
        dispatch(success(EDIT_USER_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(EDIT_USER_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const unlockUser = (userId) => {
  return (dispatch) => {
    dispatch(request(EDIT_USER_REQUEST));
    return api()
      .post(`users/${userId}/unlock`, {})
      .then((res) => {
        dispatch(success(EDIT_USER_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(EDIT_USER_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const getCheckInCheckOut = (dateFrom, dateTo) => {
  return (dispatch) => {
    dispatch(request(GET_LIST_CHECKIN_CHECKOUT_REQUEST));
    return api()
      .get(`checkin_checkouts?date_from=${dateFrom}&date_to=${dateTo}`)
      .then((res) => {
        res.data = res.data.map((data) => {
          data.key = data.id;
          return data;
        });
        res.data.sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        dispatch(success(GET_LIST_CHECKIN_CHECKOUT_SUCCESS, res.data));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          dispatch(authActions.logout());
        }
        const { status } = error.response;
        dispatch(failure(GET_LIST_CHECKIN_CHECKOUT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const homeActions = {
  getListUsers,
  editUser,
  lockUser,
  unlockUser,
  getCheckInCheckOut,
};

export default homeActions;
