import api from '../../../common/axiosConfig';
import { request, success, failure } from '../../../common/reduxActions';
import { DOWNLOAD_REQUEST, DOWNLOAD_SUCCESS, DOWNLOAD_FAILURE } from './download.constants';
import authActions from '../../auth/redux/actions';
import downloadXlsFromBase64 from '../../../common/download';

const downloadOOS = options => {
  return dispatch => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/export_osa_oos', options)
      .then(res => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'oos', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          dispatch(failure(DOWNLOAD_FAILURE, error.response));

          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadSOS = options => {
  return dispatch => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/export_osa_sos', options)
      .then(res => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'sos', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          dispatch(failure(DOWNLOAD_FAILURE, error.response));
          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadWeekend = options => {
  return dispatch => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/export_osa_weekend', options)
      .then(res => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'weekend', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          dispatch(failure(DOWNLOAD_FAILURE, error.response));
          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadPromotions = options => {
  return dispatch => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/export_osa_promotions', options)
      .then(res => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'promotions', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          dispatch(failure(DOWNLOAD_FAILURE, error.response));
          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadRental = options => {
  return dispatch => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/export_osa_rental', options)
      .then(res => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'rental', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          dispatch(failure(DOWNLOAD_FAILURE, error.response));
          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadNpd = options => {
  return dispatch => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/export_osa_npd', options)
      .then(res => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'npd', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          dispatch(failure(DOWNLOAD_FAILURE, error.response));
          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadActions = {
  downloadOOS,
  downloadSOS,
  downloadWeekend,
  downloadPromotions,
  downloadRental,
  downloadNpd,
};

export default downloadActions;
