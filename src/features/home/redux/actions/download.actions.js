import api from '../../../../common/axiosConfig';
import { request, success, failure } from '../../../../common/reduxActions';
import { DOWNLOAD_REQUEST, DOWNLOAD_SUCCESS, DOWNLOAD_FAILURE } from '../constants';
import authActions from '../../../auth/redux/actions';
import downloadXlsFromBase64 from '../../../../common/download';

const downloadOOS = (options) => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get(
        `io/oos_export?date_from=${options.date_from}&date_to=${options.date_to}&user_id=${options.user_id}&yearweek=${options.yearweek}`,
      )
      .then((res) => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'oos', 'xls');
      })
      .catch((error) => {
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

const downloadSOS = (options) => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get(
        `io/sos_export?date_from=${options.date_from}&date_to=${options.date_to}&user_id=${options.user_id}&yearweek=${options.yearweek}`,
      )
      .then((res) => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'sos', 'xls');
      })
      .catch((error) => {
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

const downloadWeekend = (options) => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get(
        `io/osa_weekend_export?date_from=${options.date_from}&date_to=${options.date_to}&user_id=${options.user_id}&yearweek=${options.yearweek}`,
      )
      .then((res) => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'weekend', 'xls');
      })
      .catch((error) => {
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

const downloadPromotions = (options) => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get(
        `io/promotion_export?date_from=${options.date_from}&date_to=${options.date_to}&user_id=${options.user_id}&yearweek=${options.yearweek}`,
      )
      .then((res) => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'promotions', 'xls');
      })
      .catch((error) => {
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

const downloadTracking = (options) => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get(
        `io/checkin_checkout_export?date_from=${options.date_from}&date_to=${options.date_to}&user_id=${options.user_id}&yearweek=${options.yearweek}`,
      )
      .then((res) => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'tracking', 'xls');
      })
      .catch((error) => {
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

const downloadRental = (options) => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get(
        `io/rental_export?date_from=${options.date_from}&date_to=${options.date_to}&user_id=${options.user_id}&yearweek=${options.yearweek}`,
      )
      .then((res) => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'rental', 'xls');
      })
      .catch((error) => {
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

const downloadNpd = (options) => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get(
        `io/npd_export?date_from=${options.date_from}&date_to=${options.date_to}&user_id=${options.user_id}&yearweek=${options.yearweek}`,
      )
      .then((res) => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'npd', 'xls');
      })
      .catch((error) => {
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

const downloadUserTemplate = () => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/user_import/template')
      .then((res) => {
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'user_template', 'xls');
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
      })
      .catch((error) => {
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

const downloadStockTemplate = () => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/stock_import/template')
      .then((res) => {
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'stock_template', 'xls');
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
      })
      .catch((error) => {
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

const downloadCheckListTemplate = () => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/checklist_import/template')
      .then((res) => {
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'checklist_template', 'xls');
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
      })
      .catch((error) => {
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

const downloadChecklistItemsTemplate = () => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/checklist_item_import/template')
      .then((res) => {
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'checklist_item_template', 'xls');
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
      })
      .catch((error) => {
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

const downloadShopTemplate = () => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get('io/shop_import/template')
      .then((res) => {
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, 'shop_template', 'xls');
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
      })
      .catch((error) => {
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
  downloadTracking,
  downloadUserTemplate,
  downloadStockTemplate,
  downloadCheckListTemplate,
  downloadChecklistItemsTemplate,
  downloadShopTemplate,
};

export default downloadActions;
