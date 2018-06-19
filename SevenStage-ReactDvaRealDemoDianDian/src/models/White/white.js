/**
 * Created by HaihuaHuang on 2017/11/29.
 */

import {queryCompanyById, updateCompany, create, queryCampaignsById} from '../../services/whiteapi';
import {message} from 'antd';

export default {
  namespace: 'white',

  state: {
    list: [],
    loading: false,
    dataEdit: [],
    dataCampaigns: [],
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
      if(data.data){
        if (data.data.result == "success") {
          yield put({
            type: 'createAction',
            payload: {
              createStatus: true,
              createErrorMsg: "",
            }
          });
          message.success("Created Successfully");
          location.href="#/app/whiteListed";
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
      location.href = path;
    },

    * fetchAllDetail({payload}, {call, put, select}) {
      const key = payload.key;
      const path = payload.path;
      const Campaigns = yield call(queryCampaignsById, key);
      const Company = yield call(queryCompanyById, key);
      //console.log(Campaigns, 'CampaignsCampaignsCampaigns');
      //console.log(Company, 'CompanyCompanyCompanyCompany');
      yield put({
        type: 'detailAllMsg',
        payload: {
          Campaigns: Campaigns,
          Company: Company,
        }
      });
      location.href = path;
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

    changeDetailLoading(state, action){
      return {...state, dataEdit: action.payload};
    },

    create(state, action) {
    },


    detailAllMsg(state, action){
      return {...state, dataCampaigns: action.payload.Campaigns, dataEdit: action.payload.Company};
    },

    createAction(state, action) {
      return {...state, createStatus: action.payload.createStatus, createErrorMsg: action.payload.createErrorMsg};
    }
  },
};

