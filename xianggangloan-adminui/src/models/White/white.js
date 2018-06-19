/**
 * Created by HaihuaHuang on 2017/11/29.
 */

import {
  queryCompanyById,
  updateCompany,
  create,
  queryCampaignsById,
  getCompanyLogBycompanyId,
  saveCampaigns,
  deleteCampaignsByIdsStatus,
  addComment,
  deleteWhiteListByIdsAsync,
  editCampaigns
} from '../../services/whiteapi';

import {message} from 'antd';

export default {
  namespace: 'white',

  state: {
    list: [],
    loading: false,
    dataEdit: [],
    dataCampaigns: [],
    dataCompanyLogs: [],
    createStatus: false,
    createErrorMsg: ""
  },

  effects: {
    * fetch({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    * create({payload}, {call, put, select}) {
      const data = yield call(create, payload);
      if (data.data) {
        if (data.data.result == "success") {
          yield put({
            type: 'createAction',
            payload: {
              createStatus: true,
              createErrorMsg: "",
            }
          });
          message.success("Created Successfully");
          location.href = "#/app/whiteListed";
        } else {
          yield put({
            type: 'createAction',
            payload: {
              createStatus: false,
              createErrorMsg: data.data.errorMsg
            }
          });
          message.error(data.data.errorMsg);
        }
      }
      else {
        message.error("Server Disconnect");
      }
    },
    * fetchEdit({payload}, {call, put, select}) {
      const parameter = payload.params;
      const result = yield call(updateCompany, parameter);
      if (result.data.result == "success") {
        message.success('Created Successfully！');
        setTimeout(
          () => {
            location.href = "#/app/whiteListed";
          },
          2000
        );
      } else {
        message.error('Created  failed！' + result.data.errorMsg);
      }
    },

    * fetchDetail({payload}, {call, put, select}) {
      const key = payload.key;
      const path = payload.path;
      const obj = yield call(queryCompanyById, key);
      yield put({
        type: 'changeDetailLoading',
        payload: obj
      });
      if(obj) {
        payload.callback(obj);
      }
      //location.href = path;
    },

    * fetchAllDetail({payload}, {call, put, select}) {
      const key = payload.key;
      const Campaigns = yield call(queryCampaignsById, key);
      const Company = yield call(queryCompanyById, key);
      const CompanyLogs = yield call(getCompanyLogBycompanyId, key);
      yield put({
        type: 'detailAllMsg',
        payload: {
          Campaigns: Campaigns,
          Company: Company,
          CompanyLogs: CompanyLogs,
        }
      });
   //   location.href = path;
    },




    * fetchAddCampaign({payload}, {call, put, select}) {
      const params = payload.params;
      const result = yield  call(saveCampaigns, params);
      console.log(result, 'add campaign message');
      if (result.data.result == "success") {
        //message.success('Created Successfully！');
        const Campaigns = yield call(queryCampaignsById, params.companyId);
        /*     let obj = {
         "approvedAmount": 123,
         "approver1": "aa",
         "approver2": "aa",
         "auditStatus": "PENDING",
         "bookingVol": 122,
         "comment": null,
         "companyId": 1,
         "endTime": 1512518400000,
         "id": 99,
         "name": "aaaaa",
         "startTime": 1512691200000,
         "status": "ACTIVE"
         };
         Campaigns.data.content.push(obj);
         console.log(Campaigns);*/
        yield put({
          type: 'detailCampaignsMsg',
          payload: {
            Campaigns: Campaigns
          }
        });
      } else {
        message.error('Created  failed！' + result.data.errorMsg);
      }
    },

    *fetchEditCampagna({payload},{call,put,select}){
      const params = payload.params;
      console.log(params);
      console.log(JSON.stringify(params));
      const result = yield call(editCampaigns, params);
      console.log(result);
      if (result.data.result == "success") {
        message.success('Created Successfully！');
        const Campaigns = yield call(queryCampaignsById, params.companyId);
        yield put({
          type: 'detailCampaignsMsg',
          payload: {
            Campaigns: Campaigns
          }
        });
      } else {
        message.error('Created  failed！' + result.data.errorMsg);
      }
    },

    * fetchDeleteCampaign({payload}, {call, put, select}) {
      const status = 'INACTIVE';
      const params = payload.params;
      const result = yield call(deleteCampaignsByIdsStatus, status, params);
      if (result.data.result == "success") {
        message.success('Created Successfully！');
        const Campaigns = yield call(queryCampaignsById, params.companyId);
        yield put({
          type: 'detailCampaignsMsg',
          payload: {
            Campaigns: Campaigns
          }
        });
      } else {
        message.error('Created  failed！' + result.data.errorMsg);
      }
    },


    * fetchAddComment({payload}, {call, put, select}) {
      const params = payload.params;
      const obj = yield call(addComment, params);
      if(obj.data.result){
        const CompanyLogs = yield call(getCompanyLogBycompanyId, params.id);
        yield put({
          type: 'detailLog',
          payload: {
            CompanyLogs: CompanyLogs,
          }
        });
      }
      else {
        message.error('Add  failed！' + result.data.errorMsg);
      }
    },
    * fetchEditFullDelete({payload}, {call, put, select}) {
      const whiteListStatus = payload.whiteListStatus;
      const ids = payload.ids;
      let deleteResponse = yield call(deleteWhiteListByIdsAsync, whiteListStatus, ids);
      if (deleteResponse != null && deleteResponse.data != null && deleteResponse.data.result == "SUCCESS") {
        message.success("Created Successfully！");
        location.href = "#/app/whiteListed";
      }
      else{
        message.error('Created  failed！' + deleteResponse.data.errorMsg);
      }
    },
  },

  reducers: {
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },

    changeDetailLoading(state, action) {
      return {...state, dataEdit: action.payload};
    },

    create(state, action) {
    },

    detailAllMsg(state, action){
      return {
        ...state,
        dataCampaigns: action.payload.Campaigns,
        dataEdit: action.payload.Company,
        dataCompanyLogs: action.payload.CompanyLogs,
      };
    },

    detailCampaignsMsg(state, action) {
      return {...state, dataCampaigns: action.payload.Campaigns};
    },

    createAction(state, action) {
      return {...state, createStatus: action.payload.createStatus, createErrorMsg: action.payload.createErrorMsg};
    },
    detailLog(state,action){
      return {...state, dataCompanyLogs: action.payload.CompanyLogs};
    }
  },
};

