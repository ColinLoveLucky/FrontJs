import {routerRedux} from 'dva/router'

export default {
  namespace: 'user',
  state: {},
  reducers: {},
  effects: {
    * login({
              payload,
            }, {put, call, select}) {
      // const data = yield call(login, payload)
      //const { locationQuery } = yield select(_ => _.app)
      // if (data.success) {
      //   const { from } = locationQuery
      //   yield put({ type: 'app/query' })
      //   if (from && from !== '/login') {
      //     yield put(routerRedux.push(from))
      //   } else {
      //     yield put(routerRedux.push('/dashboard'))
      //   }
      // } else {
      //   throw data
      // }
      yield  put(routerRedux.push('/app'));
    },
  },
  subscriptions: {},
};
