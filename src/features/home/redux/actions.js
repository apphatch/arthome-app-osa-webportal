import api from '../../../common/axiosConfig';
import { request, success, failure } from '../../../common/reduxActions';
import {
  GET_LIST_USERS_SUCCESS,
  IMPORT_STOCKS_SUCCESS,
  IMPORT_CHECKLISTS_SUCCESS,
  IMPORT_CHECKLIST_ITEMS_SUCCESS,
  EDIT_USER_SUCCESS,
  IMPORT_USERS_SUCCESS,
  GET_LIST_CHECKIN_CHECKOUT_SUCCESS,
} from './constants';
import authActions from '../../auth/redux/actions';
import FileSaver from 'file-saver';

const getListUsers = () => {
  return dispatch => {
    return api()
      .get('users')
      .then(res => {
        dispatch(success(GET_LIST_USERS_SUCCESS, res.data));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadStocks = data => {
  return dispatch => {
    return api()
      .post('stocks/import', data)
      .then(res => {
        dispatch(success(IMPORT_STOCKS_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadChecklists = data => {
  return dispatch => {
    return api()
      .post('checklists/import', data)
      .then(res => {
        dispatch(success(IMPORT_CHECKLISTS_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadChecklistItems = data => {
  return dispatch => {
    return api()
      .post('checklist_items/import', data)
      .then(res => {
        dispatch(success(IMPORT_CHECKLIST_ITEMS_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const editUser = (userId, data) => {
  return dispatch => {
    return api()
      .put('users/' + userId, data)
      .then(res => {
        // dispatch(success(EDIT_USER_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const lockUser = userId => {
  return dispatch => {
    return api()
      .post(`users/${userId}/lock`, {})
      .then(res => {
        // dispatch(success(EDIT_USER_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const unlockUser = userId => {
  return dispatch => {
    return api()
      .post(`users/${userId}/unlock`, {})
      .then(res => {
        // dispatch(success(EDIT_USER_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadUsers = data => {
  return dispatch => {
    return api()
      .post('users/import', data)
      .then(res => {
        dispatch(success(IMPORT_USERS_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const getCheckInCheckOut = () => {
  return dispatch => {
    return api()
      .get('checkin_checkouts')
      .then(res => {
        res.data = res.data.map(data => {
          data.key = data.id;
          return data;
        });
        dispatch(success(GET_LIST_CHECKIN_CHECKOUT_SUCCESS, res.data));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const downloadUserTemplate = () => {
  return dispatch => {
    return api()
      .get('users/import_template')
      .then(res => {
        dispatch(authActions.updateAuthorization(res.headers));
        var link = document.createElement('a');
        link.innerHTML = 'Download XLS file';
        link.download = 'user_template.xls';
        link.href = 'data:application/octet-stream;base64,' + res.data;
        link.click();
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

const downloadStockTemplate = () => {
  return dispatch => {
    return api()
      .get('stocks/import_template')
      .then(res => {
        dispatch(authActions.updateAuthorization(res.headers));
        var link = document.createElement('a');
        link.innerHTML = 'Download XLS file';
        link.download = 'stock_template.xls';
        link.href = 'data:application/octet-stream;base64,' + res.data;
        link.click();
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

const downloadCheckListTemplate = () => {
  return dispatch => {
    return api()
      .get('checklists/import_template')
      .then(res => {
        dispatch(authActions.updateAuthorization(res.headers));
        var link = document.createElement('a');
        link.innerHTML = 'Download XLS file';
        link.download = 'checklist_template.xls';
        link.href = 'data:application/octet-stream;base64,' + res.data;
        link.click();
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

const downloadChecklistItemsTemplate = () => {
  return dispatch => {
    return api()
      .get('checklist_items/import_template')
      .then(res => {
        dispatch(authActions.updateAuthorization(res.headers));
        var link = document.createElement('a');
        link.innerHTML = 'Download XLS file';
        link.download = 'checklist_item_template.xls';
        link.href = 'data:application/octet-stream;base64,' + res.data;
        link.click();
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

const downloadShopTemplate = () => {
  return dispatch => {
    return api()
      .get('shops/import_template')
      .then(res => {
        dispatch(authActions.updateAuthorization(res.headers));
        var link = document.createElement('a');
        link.innerHTML = 'Download XLS file';
        link.download = 'shop_template.xls';
        link.href = 'data:application/octet-stream;base64,' + res.data;
        link.click();
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

const homeActions = {
  getListUsers,
  uploadStocks,
  uploadChecklists,
  uploadChecklistItems,
  editUser,
  lockUser,
  unlockUser,
  uploadUsers,
  getCheckInCheckOut,
  downloadUserTemplate,
  downloadStockTemplate,
  downloadCheckListTemplate,
  downloadChecklistItemsTemplate,
  downloadShopTemplate,
};

export default homeActions;
