/**
 * Created by HaihuaHuang on 2017/10/25.
 */
import {BaseApiMethod, BaseService} from './business.service';


class ApiMethod extends BaseApiMethod {
     setLanguage(data){
         return this.post("LANGUAGE",data);
     }
}

class GlobalService{
    constructor(UtilsService) {
        this.api = new ApiMethod(UtilsService);
    }
    setLanguage(data){
        return this.api.setLanguage(data);
    }
}

angular.module('biz-services').factory("GlobalService", ["UtilsService",function (UtilsService) {
    return new GlobalService(UtilsService);
}]);