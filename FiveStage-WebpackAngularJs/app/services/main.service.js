angular.module('services', []).factory('LoadingService', ["$rootScope", function ($rootScope) {
    return {
        showLoading: () => {
            $rootScope.isShowLoading = true;
        },
        hideLoading: () => {
            $rootScope.isShowLoading = false;
        }
    }
}]).factory('permissions', ['$rootScope', '$cookieStore', function ($rootScope, $cookieStore) {
        return {
            setPermissions: function (permissions) {
                if (permissions) {

                    $cookieStore.put("currentuser", permissions.menuList);
                    $cookieStore.put("currentuser_obj", permissions);


                    $rootScope.$broadcast('permissionsChanged');
                }
            },
            hasPermission: function (cu, permission) {
                let isShowDom = false;
                permission = permission.trim();
                angular.forEach(cu, function (data, index, array) {
                    if (data == permission) {
                        isShowDom = true;
                    }
                });
                return true; //isShowDom;
            }
        };
    }])