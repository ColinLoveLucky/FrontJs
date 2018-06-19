import request from '../utils/request';
import { batchOperateType } from '../utils/constObject';
import "babel-polyfill";

export async function batchUpdate(params){
  const formData = new FormData();
  formData.append("file",params);
  return request('/admin/api/whiteList/batch/add/companys/111', {
    method: 'POST',
    headers:{},
    body:formData
  });
}

export async function queryUsr(){
  return request('/admin/api/user/query', {
    method: 'GET',
    credentials: 'include',
  });
}
export async function login(params) {
  // let formData=new FormData();
  // formData.append("bankId","supper1");
  // formData.append("password","super1");
  const userName =params!=undefined? params.userName:"";
  const password =params!=undefined? params.password:"";
  const data = `bankId=${userName}&password=${password}`;
  return request('/admin/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: data,
    // body:"bankId=supper1&password=passw0rd"
    //   body: JSON.stringify({
    //     bankId:'supper1',
    //     password:'super1'
    //   })

  });
}

export async function loginOut() {
  return request('/admin/api/logout',{
    method: 'POST'
  });
}

export async function create(params) {
  const checkPoint = (params.chkSAIC ? "1" : "0") + (params.chkOfficial ? "1" : "0") + (params.chkEmail ? "1" : "0");
  const dataValue = {
    "officialName": params.CompanyOfficialName,
    "emailDomain": params.CompanyPrivateEmailDomain,
    "officialWebsite": params.CompanyOfficialWebsite,
    "registeredAddress": params.CompanyRegisteredAddress,
    "phoneNumber": params.CompanyRegisteredPhoneNumber,
    "registNumber": params.CompanySAICRegistrationNumber,
    "companyType": params.CompanyType,
    "industry": params.IndustryBusinessNature,
    "establishedDate": params.CompanyEstablishedTime.format(),
    "registeredCapital": params.CompanyRegisteredCapital,
    "paidCapital": params.ActualPaidCapital,
    "employeesSum": params.ScaleOfEmployees,
    "totalArea": params.TotalAreaUsedForBusinessOperation,
    "isPublicly": params.IsTheCompanyPubliclyListed,
    "stockCode": params.StockCode,
    "isScbSubcompany": params.IsTheCompanyPartOfSCB,
    "isScbApprovedCompany": params.IsTheCompanyInSCBApprovedCompanyList,
    // "status": params.WhitelistStatus,
    "bookingVol7Days": params.BookingVolumeCap7DaysLow,
    "bookingVol1Month": params.BookingVolumeCap1MonthLow,
    "bookingVol2Month": params.BookingVolumeCap2MonthsLow,
    "bookingVol3Month": params.BookingVolumeCap3MonthsLow,
    "approvedAmount7Days": params.ApprovedAmountCap7DaysLow,
    "approvedAmount1Month": params.ApprovedAmountCap1MonthsLow,
    "approvedAmount2Month": params.ApprovedAmountCap2MonthsLow,
    "approvedAmount3Month": params.ApprovedAmountCap3MonthsLow,
    "checkPoint": checkPoint,
  }
  console.log(JSON.stringify(dataValue));
  return request('/admin/api/whiteList/add/company', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(dataValue),
  });
}

/**更新公司信息**/
export async function updateCompany(params) {
  return request('/admin/api/whiteList/save/company', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });
}

/**根据id 获取公司信息**/
export async function queryCompanyById(id) {
  return request('/admin/api/whiteList/company/' + id, {
    method: 'get',
    headers: {
      'Content-Type': "application/json",
    },
    credentials: 'include',
  });
}

/**根据条件查询白名单**/
export async function queryWhiteListByConditionAsync(params) {
  return request('/admin/api/whiteList/companys/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });
}

/**根据Ids批量导出白名单**/
export async function exportWhiteListByIdsAsync(ids, params) {
  console.log(ids);
  console.log(params);
  return request('/admin/api/whiteList/batch/export/companys/' + ids, {
    //method: 'POST',
    method: 'GET',
    headers: {
      "Accept": "*/*",
      //'Content-Type': 'application/x-xls',
    },
    credentials: 'include',
    //body: JSON.stringify(params),
  });
}

/**批量删除白名单**/
export async function deleteWhiteListByIdsAsync(status, params) {
  return request('/admin/api/whiteList/save/companys/' + status, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });
}

/**根据活动id 和状态 修改活动状态**/
export async function deleteCampaignsByIdsStatus(status, params) {
  return request('/api/whiteList/save/campaign/' + status, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });
}


/**根据检查点批量新增和更新白名单**/
export async function batchOperateWhiteListByCheckpPointAsync(checkPoint, operateType, file) {
  let url = "";
  switch(operateType){
    case batchOperateType.ADD:
      url = '/admin/api/whiteList/batch/add/companys/' + checkPoint;
      break;

    case batchOperateType.UPDATE:
      url = '/admin/api/whiteList/batch/update/companys/' + checkPoint;
      break;
  }
  console.log(file);
  let formData = new FormData();
  formData.append("file", file);
  return request(url, {
    method: 'POST',
    headers: {
      // "Accept": "*/*",
      // 'Content-Type': 'multipart/form-data',
    },
    credentials: 'include',
    body: formData,
  });
}

/*查询公司活动*/
export async function queryCampaignsById(id){
  return request('/admin/api/whiteList/campaigns/' + id, {
    method: 'get',
    headers: {
      'Content-Type': "application/json",
    },
    credentials: 'include',
  });
}

/**保存公司活动信息**/
export async function saveCampaigns(params) {
  return request('/admin/api/whiteList/add/campaign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });
}

/**修改公司活动信息**/
export async function editCampaigns(params) {
  return request('/admin/api/whiteList/save/campaign',{
     method:'POST',
    headers:{
       'Content-Type':'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(params),
  })
}

/*获取白名单公司操作相关log*/
export async function getCompanyLogBycompanyId(id){
  return request('/admin/api/whiteList/company/'+ id+'/logs', {
    method: 'get',
    headers: {
      'Content-Type': "application/json",
    },
    credentials: 'include',
  });
}
/*添加公司Comment*/
export async function addComment(params){
  return request('/admin/api/whiteList/add/company/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });
}

/**批量审核白名单**/
export async function batchAuditWhiteListByIdsAsync(status, params) {
  return request('/admin/api/whiteList/audit/company/' + status, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });
}
