
import angular from 'angular';
import sanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import  ngCookies from 'angular-cookies';

import 'angular-translate';
import '../../node_modules/angular-translate/dist/angular-translate-storage-local/angular-translate-storage-local';
import  '../../node_modules/angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie';

import 'ng-table';
import * as _ from 'lodash';
import 'angular-ui-bootstrap';
import uiBootstrap from 'angular-ui-bootstrap';
import toastr from 'angular-toastr';
import fileUpload from 'ng-file-upload';
import 'moment';
import 'bootstrap';
import 'angular-bootstrap-datetimepicker';
import '../../node_modules/metismenu/dist/metisMenu.min';
import '../../node_modules/metismenu/dist/metisMenu.min.css';
import  '../styles/loader.css';

import './controllers';
import './services';
import './directives';
import './filter/main.filter';
//app js
import UtilsService from './basic.server';
import appConfig from './config';
import  langConfig from './language.config';
import test from '../lib/menu';

//css
import '../styles/main.css';
import '../styles/golbal.css';
import '../styles/timeline.css';
import '../styles/app.css';
import '../styles/font.css';
import '../styles/vendor.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/ng-table/dist/ng-table.css';
import '../../node_modules/angular-toastr/dist/angular-toastr.css';
import '../../node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css';

//上线 注释该段代码
//import '../../mock/index';


let homeModule = angular.module('opchannelapp',
    [uiRouter, uiBootstrap, toastr, 'ngTable', sanitize, 'directives', 'controller', 'services', 'main.filter', fileUpload,
        'ui.bootstrap.datetimepicker', ngCookies, 'pascalprecht.translate' ]);

homeModule.factory('UtilsService', UtilsService);
homeModule.config(appConfig);
homeModule.config(langConfig);


/*
homeModule.config(function ($sceDelegateProvider, $httpProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        "http://10.9.31.171:8080/admin/api/!**"]);
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json; charset=UTF-8';
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
});
*/



/**
 * 程序run时，请求接口，获取权限数据
 * */

/*homeModule.run(['$http'],function ($q, permissions, $http) {
 //permissions.setPermissions(permissionList);
 $http.get("../app/i18n/en.json").success(function (freetrial) {
 console.log(freetrial);
 /!* alert(freetrial);
 $scope.data = freetrial;*!/
 });

 });*/

angular.element(document).ready(function () {
    angular.bootstrap(document, ['opchannelapp']);
});
//
// console.log(new test().getMenusByRole("Admin"));
// console.log(new test().getOperatorsByRoleMenuKey("Admin", "T_UserManagement"));