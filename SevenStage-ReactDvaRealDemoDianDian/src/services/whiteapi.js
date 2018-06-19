import request from '../utils/request';
import { batchOperateType } from '../utils/constObject'

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
  const userName = params.userName;
  const password = params.password;
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
      'Content-Type': "application/json",
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
    method: 'POST',
    headers: {
      //'Accept': 'application/x-xls',
      "Accept": "*/*",
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(params),
    //body: params,
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

/**根据检查点批量新增和更新白名单**/
export async function batchOperateByCheckpPointAsync(operateType, checkPoint, file) {
  let url = "";
  switch(operateType){
    case batchOperateType.ADD:
      url = '/admin/api/whiteList/batch/add/companys/' + checkPoint;
      break;

    case batchOperateType.UPDATE:
      url = '/admin/api/whiteList/batch/update/companys/' + checkPoint;
      break;
  }
  let formData = new FormData();
  formData.append("file", file);
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
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
