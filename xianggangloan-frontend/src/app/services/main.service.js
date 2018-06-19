angular.module('services')
    .factory('HttpInterceptor', ["$q", "$rootScope", function ($q, $rootScope) {
        var httpInterceptor = {
            request: function (config) {
                config.headers = config.headers || {};
                if (!(typeof ($rootScope.currentuser_name) == "undefined")) {
                    //config.headers["userCode"] = encodeURI($rootScope.currentuser_name);
                    config.headers.userCode = encodeURI($rootScope.currentuser_name);
                    config.headers.userName = encodeURI($rootScope.currentuser_name);
                    config.headers.email = $rootScope.currentuser_email;
                }
                return config;
            },
            response: function (response) {
                // $rootScope.isShowLoading = false;
                return response;
            },
            requestError: function (rejection) {
                // $rootScope.isShowLoading = false;
                return rejection;
            },
            responseError: function (rejection) {
                // $rootScope.isShowLoading = false;
                return rejection;
            }
        };
        return httpInterceptor;
    }])

    .factory('UpLoadService', ['$q', 'UtilsService', 'Upload', function ($q, UtilsService, Upload) {
        return {
            UpLoadFile: function (url, postData) {
                let deferred = $q.defer();
                Upload.upload({
                    headers: {
                        'apiKey': "opc"
                    },
                    url: UtilsService.getIp() + url,
                    data: postData
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };
    }])

    .factory('permissions', ['$rootScope', function ($rootScope) {
        return {
            setPermissions: function (permissions) {
                if(permissions) {
                    $rootScope.curentuser = permissions;
                    $rootScope.currentuser_name = permissions.name;
                    $rootScope.currentuser_email = permissions.email;
                    $rootScope.$broadcast('permissionsChanged')
                }
            },
            hasPermission: function (cu, permission) {
                let isShowDom = false;
                permission = permission.trim();
                angular.forEach(cu.permMap, function (data, index, array) {
                    angular.forEach(data, function (pri, index, array) {
                        if (pri === permission) {
                            isShowDom = true;
                        }
                    });
                });
                return isShowDom;
            }
        };
    }])

    .factory('LoadingService', ["$rootScope", function ($rootScope) {
        return {
            showLoading: ()=> {
                $rootScope.isShowLoading = true;
            },
            hideLoading: ()=> {
                $rootScope.isShowLoading = false;
            }
        }
    }]);