import api from '../../../common/axiosConfig';
import { request, success, failure } from '../../../common/reduxActions';
import {} from './constants';
import authActions from '../../auth/redux/actions';
import downloadXlsFromBase64 from '../../../common/download';

const downloadOOS = () => {
  return dispatch => {
    return api()
      .get('io/export_osa_oos')
      .then(res => {
        console.log(res);
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'oos', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadSOS = () => {
  return dispatch => {
    return api()
      .get('io/export_osa_sos')
      .then(res => {
        console.log(res);
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'sos', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadWeekend = () => {
  return dispatch => {
    return api()
      .get('io/export_osa_weekend')
      .then(res => {
        console.log(res);
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'weekend', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadPromotions = () => {
  return dispatch => {
    return api()
      .get('io/export_osa_promotions')
      .then(res => {
        console.log(res);
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'promotions', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadRental = () => {
  return dispatch => {
    return api()
      .get('io/export_osa_rental')
      .then(res => {
        console.log(res);
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'rental', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadNpd = () => {
  return dispatch => {
    return api()
      .get('io/export_osa_npd')
      .then(res => {
        console.log(res);
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'npd', 'xls');
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
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
