import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import  ngCookies from 'angular-cookies';
import "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/app.css';
import  './styles/font.css';
import  './styles/vendor.css';
import appConfig from './config';
import './controllers';
import './services';
let localModule = angular.module("homeapp", [uiRouter,uiBootstrap,'controller',"services",ngCookies]);
localModule.config(appConfig);
angular.element(document).ready(function () {
    angular.bootstrap(document,['homeapp']);
})