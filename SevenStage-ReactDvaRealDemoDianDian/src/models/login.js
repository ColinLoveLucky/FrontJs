import {routerRedux} from 'dva/router';
import {login, queryUsr} from '../services/whiteapi';
import {message} from 'antd';

export default {
  namespace: 'login',
  state: {
    isLogin: false,
    loginFail: false,
    userName: '',
  },
  reducers: {
    checkLogin(state, action) {
      localStorage.setItem("userName",action.payload.userName);
      return {
        ...state,
        isLogin: action.payload.isLogin,
        loginFail: action.payload.loginFail,
        userName: action.payload.userName
      };
    },
    loginFail(state, action) {
      return {...state, loginFail: action.payload.loginFail, isLogin: action.payload.isLogin};
    }
  },
  effects: {
    * loginin({
                payload,
              }, {put, call, select}) {
      const data = yield call(login, payload);
      if (data.data) {
        if (data.data.result == "success") {
          yield  put({
            type: 'checkLogin',
            payload: {
              isLogin: true,
              loginFail: false,
              userName: payload.userName
            }
          })
          yield  put(routerRedux.push('/app'));
        } else {
          yield put({
            type: 'loginFail',
            payload: {
              loginFail: true,
              isLogin: false,
            }
          });
          message.error("Login Failed");
        }
      } else {
        message.error("Server Disconnect");
      }
    },
    * loginhook({payload}, {select, call, put}) {
      const a = yield  select(_ => _.app)
      const isLogin = yield select((state) => state.login.isLogin);
      if (isLogin === false) {
        const dataUsr = yield  call(queryUsr, payload);
        if (dataUsr.data) {
          if (dataUsr.data.result != "success") {
            yield  put((routerRedux.push('/login')));
          }
        } else {
          message.error("Server Disconnect");
        }
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname.includes('app')) {
          dispatch({
            type: 'loginhook',
          })
        }
      });
    }
  },
};
