import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-cookies';
import "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "../common/css/index.css";
import "../common/css/login.css";
import "../common/css/userManager.css";
import appConfig from './config';
import languageConfig from '../common/config/language.config';
import './controller';
import '../services';
import 'angular-translate';
import 'angular-translate-storage-cookie';
import '../node_modules/angular-translate/dist/angular-translate-storage-local/angular-translate-storage-local';
//import '../app-mock/user/userManager.mock';
import A from '../Plugin/menu';
let localModule = angular.module("homeapp", [uiRouter, uiBootstrap, 'ngCookies', 'controller', 'services', 'pascalprecht.translate']);
localModule.config(appConfig);
localModule.config(languageConfig);
localModule.config(["$httpProvider",function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);
angular.element(document).ready(function () {
    angular.bootstrap(document, ['homeapp']);
});
