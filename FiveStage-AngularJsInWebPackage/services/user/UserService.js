// import '../../app-mock/user/userManager.mock';
import UrlConfig from '../../common/config/addressConfig';
angular.module('services').factory("UserManagerService", ["$http", function ($http) {
    var users = [];
    // var promise = $http({
    //     url: UrlConfig().userManagerUrl,
    //     method: 'GET'
    // });
    var addUsr = function (usrName, password, realName, email, mobile, role) {
        return $http({
            url: UrlConfig().usrCreate,
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            timeout:1000,
            data: {
                "username": usrName,
                "password": password,
                "realName": realName,
                "email": email,
                "mobile": mobile,
                "role": role
            }
        });
    }
    return {
        getAll: function () {
            //  return users;
        //   return promise;
        },
        getById: function () {
        },
        addUsr: function (usrName, password, realName, email, mobile, role) {
            return addUsr(usrName, password, realName, email, mobile, role);
        }
    };
}]);