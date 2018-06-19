/**
 * Created by leiz on 2017/3/22.
 */

import userRegsiterModal from '../templates/modal-Register.html';

LoginController.$inject = ['$scope', '$location', '$translate', '$uibModal', 'toastr', 'LoginService', 'GlobalService', '$rootScope'];

function LoginController($scope, $location, $translate, $uibModal, toastr, LoginService, GlobalService, $rootScope) {
    $scope.viewModel = {
        account: "",
        passWord: ""
    };
    $rootScope.role = "Admin";

    $scope.switching = function (lang) {
        console.log(lang);
     /*   if (!lang) {
            alert("语言不能为空");
        } else {
            //设置服务器端语言状态
            GlobalService.setLanguage(lang).then(function (data) {
                console.log(data);
                if (data.result == "success") {*/
                    $translate.use(lang);
                    window.localStorage.lang = lang;
                  //  window.location.reload();
              /*  }else{
                    //国际化 接口调用不通的时候  如何显示？
                }
            });
        }*/
    };
    $scope.cur_lang = $translate.use();

    $scope.login = function () {
        // $location.path("/main").replace();
        if (!$scope.viewModel.account) {
            return alert("用户名不为空！");
        }
        if (!$scope.viewModel.passWord) {
            return alert("密码不能为空！");
        }
        var data = "username=tom001&password=passw0rd";
        LoginService.login(data).then(function (data) {
            console.log(data);
            if(data && data.result=="error"){
                alert(data.errorMsg);
            }
        },function (data) {
            console.log(data);
        });
    };

    $scope.RegsiterUser = function () {
        let modalInstance = $uibModal.open({
            size: 'ml',
            backdrop: 'static',
            keyboard: false,
            animation: true,
            template: userRegsiterModal,
            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                $scope.userModel = {
                    username: "huanghaihua",
                    password: "Password@1",
                    realName: "黄晓明",
                    email: "4333@qq.com",
                    mobile: "13167081189"
                }
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.submit = function () {
                    let data = {
                        "username": $scope.userModel.username,
                        "password": $scope.userModel.password,
                        "realName": $scope.userModel.realName,
                        "email": $scope.userModel.email,
                  //      "mobile": $scope.userModel.mobile,
                        "role": "FRM_MAKER"
                    }
                    console.log(data);
                    LoginService.createUser(data).then(function (data) {
                        console.log(data);
                        if (data.result) {
                            toastr.success("创建用户成功！");
                        } else {
                            toastr.error("创建用户失败：" + data.errorMsg);
                        }
                    });

                }
            }]

        });

    }
}
angular.module('controller').controller("LoginController", LoginController);