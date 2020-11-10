import api from '../../../../common/axiosConfig';
import { request, success, failure } from '../../../../common/reduxActions';
import { IMPORT_SUCCESS, IMPORT_REQUEST, IMPORT_FAILURE } from '../constants';
import authActions from '../../../auth/redux/actions';

const uploadStocks = data => {
  return dispatch => {
    dispatch(request(IMPORT_REQUEST));
    return api('multipart/form-data')
      .post('io/import_stocks', data)
      .then(res => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadChecklists = data => {
  return dispatch => {
    dispatch(request(IMPORT_REQUEST));
    return api('multipart/form-data')
      .post('io/import_checklists', data)
      .then(res => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadChecklistItems = data => {
  return dispatch => {
    dispatch(request(IMPORT_REQUEST));
    return api('multipart/form-data')
      .post('io/import_checklist_items', data)
      .then(res => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadFull = data => {
  return dispatch => {
    dispatch(request(IMPORT_REQUEST));
    return api('multipart/form-data')
      .post('io/import_full', data)
      .then(res => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadPhotos = data => {
  return dispatch => {
    dispatch(request(IMPORT_REQUEST));
    return api('multipart/form-data')
      .post('io/import_photos', data)
      .then(res => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadUsers = data => {
  return dispatch => {
    dispatch(request(IMPORT_REQUEST));
    return api()
      .post('io/import_users', data)
      .then(res => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const importActions = {
  uploadStocks,
  uploadChecklists,
  uploadChecklistItems,
  uploadFull,
  uploadUsers,
  uploadPhotos,
};

export default importActions;
