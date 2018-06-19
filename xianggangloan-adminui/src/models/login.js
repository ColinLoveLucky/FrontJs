import {routerRedux} from 'dva/router';
import {login, queryUsr, loginOut} from '../services/whiteapi';
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
      localStorage.setItem("userName", action.payload.userName);
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
          yield  put(routerRedux.push('/app/welcome'));
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
            location.href = "#/login";
          }
        } else {
          message.error("Server Disconnect");
        }
      }
    },

    * loginout({payload}, {select, call, put}) {
      const response = yield call(loginOut, "");
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        // if (location.pathname.includes('app')) {
        //   dispatch({
        //     type: 'loginhook',
        //   })
        // }
        location.pathname.split('/').forEach(item => {
          if (item == "app") {
            dispatch({
              type: 'loginhook',
            });
          }
        });
      });
    }
  },
};
