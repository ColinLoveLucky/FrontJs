import {ListData} from './whitelistTest';
import { queryWhiteListByConditionAsync, exportWhiteListByIdsAsync, deleteWhiteListByIdsAsync, batchOperateByCheckpPointAsync } from '../../services/whiteapi';
import { actionType, responseStatus } from '../../utils/constObject';

export default {
  namespace: 'whiteList',
  state: {
    data: {
      list: []
    },
    batchExportUrl:"",
    batchOperateResponseStatus:"",
    batchOperateResponseErrMsg:"",
    chkSAICStatus: true,
    chkOfficialStatus: true,
    chkEmailStatus: true,
  },
  reducers: {
    getWhilteListByCondition(state, action) {
      let response = action.payload;
      let result = [];
      if(response != null && response.data != null && response.data.result == responseStatus.SUCCESS){
        let content = response.data.content;
        if(content != null){
          result = content.data;
        }
      }
      console.log(result);
      state.data.list = result;
      return {...state};
    },
    batchRemove(state, action) {
      const ids = action.payload.ids;
      let result = [];
      for (let i = 0; i < state.data.list.length; i++) {
        let isExist = false;
        for(let j = 0; j < ids.length; j++){
          if (state.data.list[i].id === ids[j]) {
            isExist = true;
            break;
          }
        }
        if(!isExist){
          result.push(state.data.list[i]);
        }
      }
      state.data.list = result;
      return {...state};
    },
    batchExport(state, action) {
      let response = action.payload;
      var blob = new Blob([response]);
      const url= (window.URL || window.webkitURL).createObjectURL(blob);
      console.log(url);
      state.batchExportUrl = url;
      //window.URL = window.URL || window.webkitURL;
      //blob.replace("blob:","");
      //const url=window.URL.createObjectURL(blob).replace("blob:","");
     // console.log(window.URL.createObjectURL(response));
      //  URI.createObjectURL()
      //Window.URL.createObjectURL(new Blob(response, {type: "application/x-xls"}))
      // const url = URL.createObjectURL(response);
     //let a = document.createElement('a');
      //a.href = url;
      //a.download = `查询结果_${new Date()}.xls`;
      //a.click();
      //a.remove();
      //console.log(response.data);
      return {...state};
    },
    batchOperate(state, action){
      let response = action.payload;
      if(response != null && response.data != null){
        if(response.data.result == responseStatus.ERROR){
          state.batchOperateResponseErrMsg = response.data.errorMsg;
        }else if(response.data.result == responseStatus.SUCCESS){
          state.batchOperateResponseErrMsg = "";
        }
        state.batchOperateResponseStatus = response.data.result;
      }
    },
    edit(state, action) {
      const path = action.payload.path;
      const key = action.payload.key;
      console.log(key);
      location.href = path;
      return {...state};
    },
    detail(state,action){
      const path = action.payload.path;
      const key = action.payload.key;
      console.log(key);
      location.href = path;
      return {...state};
    }
  },
  effects: {
    *query(payload,{call,put,select}){
     // yield put(type:edit,payload:pauloas)
    },
    *loadData({payload},{call,put}){
      const action = payload.action;
      const searchModel = payload.searchModel;
      console.log(searchModel);
      if(action == actionType.SEARCH){
        let queryResponse = yield call(queryWhiteListByConditionAsync, searchModel);
        yield put({
          type: 'getWhilteListByCondition',
          payload: queryResponse,
        });
      }else if(action == actionType.DELETE){
        const whiteListStatus = payload.whiteListStatus;
        const ids = payload.ids;
        let deleteResponse = yield call(deleteWhiteListByIdsAsync, whiteListStatus, ids);
        console.log(deleteResponse);
        if(deleteResponse != null && deleteResponse.data != null && deleteResponse.data.result == responseStatus.SUCCESS){
          let queryResponse = yield call(queryWhiteListByConditionAsync, searchModel);
          yield put({
            type: 'getWhilteListByCondition',
            payload: queryResponse,
          });
        }
      }
    },
    *exportWhilteListByIds({payload},{call,put}){
      const ids = payload.ids.join(",");
      //const searchModel = payload.searchModel;
      //const searchModel = {"status": "ACTIVE"};
      const searchModel = {};
      const response = yield call(exportWhiteListByIdsAsync, ids, searchModel);
      yield put({
        type: 'batchExport',
        payload: response,
      });
    },
    *batchOperateByCheckpPoint({payload},{call,put}){
      const operateType = payload.operateType;
      const checkPoint = payload.checkPoint;
      const file = payload.file;
      const response = yield call(batchOperateByCheckpPointAsync, operateType, checkPoint, file);
      yield put({
        type: 'batchOperate',
        payload: response,
      });
    },
  },
  subscriptions: {},
};
