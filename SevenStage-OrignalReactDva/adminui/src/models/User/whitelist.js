import {ListData} from './whitelistTest';

export default {
  namespace: 'white',
  state: {
    data: {
      list: ListData
    },
  },
  reducers: {
    search(state, action) {
      const number = action.payload.number;
      const status = action.payload.status;
      let result = [];
      for (var i = 0; i < state.data.list.length; i++) {
        if (state.data.list[i].number == number) {
          result.push(state.data.list[i]);
        }
      }
      if (result.length > 0)
        state.data.list = result;
      else
        state.data.list = ListData;
      return {...state};
    },
    remove(state, action) {
      const key = action.payload.key;
      let result = [];
      for (var i = 0; i < state.data.list.length; i++) {
        if (state.data.list[i].key !== key) {
          result.push(state.data.list[i]);
        }
      }
      state.data.list = result;
      return {...state};
    },
    edit(state, action) {
      const path = action.payload.path;
      const key = action.payload.key;
      location.href = path;
      return {...state};
    }
  },
  effects: {
    *query(payload,{call,put,select}){
     // yield put(type:edit,payload:pauloas)
    }
  },
  subscriptions: {},
};
