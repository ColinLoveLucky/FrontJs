function UserManagerController($scope, UserManagerService) {
    $scope.isAdd=false;
    $scope.domain = {
        NAME: null,
        TELPHONE: null,
        DepartmentId: null,
        UserCompanyId: null
    }
    getAllUser(UserManagerService, $scope);
    $scope.query = function () {
        // var array = [];
        // var values = $scope.userData;
        // var name = $scope.domain.NAME;
        // var tel = $scope.domain.TELPHONE;
        // for (var i = 0; i < values.length; i++) {
        //     if (values[i].name == name) {
        //         array.push(values[i])
        //     }
        // }
        // if ($scope.domain.NAME == null || $scope.domain.NAME == "") {
        //     array = values;
        // }
        // $scope.Users = array;
    }
    $scope.add = function () {
        $scope.isAdd=true;
    };
    $scope.addSubmit=function () {
        $scope.isAdd=false;
        UserManagerService.addUsr($scope.usrName,$scope.password,
            $scope.realName,$scope.email,$scope.mobile,$scope.role).then(function (rsp) {
            console.log($scope.usrName);
            console.log(rsp.data);
        },function (rsp) {
            console.log(rsp.data);
        });
    }
}
function getAllUser(UserManagerService, $scope) {
    // UserManagerService.getAll().then(function (resp) {
    //     $scope.userData = resp.data;
    //     $scope.Users = resp.data;
    // }, function (resp) {
    // });
}

UserManagerController.$inject = ["$scope", "UserManagerService"];
angular.module("controller").controller("UserManagerController", UserManagerController);