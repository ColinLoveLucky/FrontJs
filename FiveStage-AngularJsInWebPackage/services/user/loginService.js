import UrlConfig from '../../common/config/addressConfig';
angular.module('services').factory("LoginService", ["$http", function ($http) {
    var users = [];
    var promise = function (userName, passWord) {
        return $http({
            url: UrlConfig().LoginManagerUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // params: {
            //     username: userName,
            //     password: passWord
            // }
            params: {
                username: userName,
                password: passWord
            }
        });
    }
    var logout = function () {
        console.log( UrlConfig().logout);
        return $http({
            url: UrlConfig().logout,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    return {
        ChkUsr: function (userName, passWord) {
            //  return users;
            return promise(userName, passWord);
        },
        Logout: function () {
            return logout();
        }
    };
}]);