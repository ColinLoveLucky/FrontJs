import {routerRedux} from 'dva/router'
export default {
  namespace: 'app',
  state: {
    ddd:'aaa'
  },
  effects: {
    * go({payload,}, {put, call, select}) {
      // yield  put(routerRedux.push(payload));
      // console.log(payload);
      // location.href=payload;
      //yield put({ type: 'goto' });
      yield put({type: 'goto', payload: payload});
    },
  },
  reducers: {
    goto(state, action) {
      location.href = action.payload;
      return {...state};
    }
  },
  subscriptions: {}
};
