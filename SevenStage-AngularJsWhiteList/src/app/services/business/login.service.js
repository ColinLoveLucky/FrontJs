
import {BaseApiMethod, BaseService} from './business.service';

class ApiMethod extends BaseApiMethod {


    createUser(data){
        return this.post("USERCREATE",data);
    }
    logout(data){
        return this.post("LOGOUT",data);
    }
    login(data){
        return this.post("LOGIN",data,"",null,{'Content-Type': 'application/x-www-form-urlencoded'});
    }

}

class LoginService{
    constructor(UtilsService) {
        this.api = new ApiMethod(UtilsService);
    }
    createUser(data){
        return this.api.createUser(data);
    }
    logout(data){
        return this.api.logout(data);
    }
    login(data){
        return this.api.login(data);
    }

}

angular.module('biz-services').factory("LoginService", ["UtilsService",function (UtilsService) {
    return new LoginService(UtilsService);
}]);