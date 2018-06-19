
import { queryWhiteListByConditionAsync, deleteWhiteListByIdsAsync,  queryCampaignsById, getCompanyLogBycompanyId } from '../../services/whiteapi';


import {actionType, auditStatusType, responseStatus} from '../../utils/constObject';

import { message } from 'antd';

export default {
  namespace: 'whiteListApprove',
  state: {
    data: {
      list: [],
      dataCampaigns:[],
      dataCompanyLogs:[]
    },
  },
  reducers: {
    getWhilteListByCondition(state, action) {
      let response = action.payload;
      let result = [];
      if(response != null && response.data != null && response.data.result == responseStatus.SUCCESS){
        let content = response.data.content;
        if(content != null){
          result = content;
        }
      }
      console.log(result);
      state.data.list = result;
      return {...state};
    },

    detail(state,action){
      const path = action.payload.path;
      const key = action.payload.key;
      console.log(key);
      location.href = path;
      return {...state};
    },

    getCampaignsLogs(state, action){
      state.data.dataCampaigns = action.payload.Campaigns;
      state.data.dataCompanyLogs = action.payload.CompanyLogs;
      return {
        ...state
      };
    },


  },
  effects: {
    *query(payload,{call,put,select}){
      // yield put(type:edit,payload:pauloas)
    },
    *loadData({payload},{call,put}){
      const action = payload.action;
      const searchModel = payload.searchModel;
      console.log("loadData:", searchModel);
      if(action == actionType.SEARCH){
        let queryResponse = yield call(queryWhiteListByConditionAsync, searchModel);
        yield put({
          type: 'getWhilteListByCondition',
          payload: queryResponse,
        });
      }else if(action == actionType.APPROVE || action == actionType.REJECT){
        const ids = payload.ids;
        let opStatus = null;
        if(action == actionType.APPROVE){
          opStatus = auditStatusType.APPROVED;
        }else if(action == actionType.REJECT){
          opStatus = auditStatusType.REJECT;
        }else{
          // Do Nothing
        }
        let auditResponse = yield call(batchAuditWhiteListByIdsAsync, opStatus, ids);
        console.log(auditResponse);
        if(auditResponse != null && auditResponse.data != null){
          if(auditResponse.data.result == responseStatus.SUCCESS){
            let queryResponse = yield call(queryWhiteListByConditionAsync, searchModel);
            yield put({
              type: 'getWhilteListByCondition',
              payload: queryResponse,
            });
            message.success("Audit Successfully");
          }else if(auditResponse.data.result == responseStatus.ERROR){
            message.error(auditResponse.data.errorMsg);
          }
        }else{
          message.error("Out of service");
        }
      }
    },


    /**获取活动和日志信息**/
      * fetchCampaignsLogs({payload}, {call, put, select}) {
      const key = payload.key;
      const Campaigns = yield call(queryCampaignsById, key);
      const CompanyLogs = yield call(getCompanyLogBycompanyId, key);
      yield put({
        type: 'getCampaignsLogs',
        payload: {
          Campaigns: Campaigns,
          CompanyLogs: CompanyLogs,
        }
      });
    },


  },
  subscriptions: {},
};
