import angular from 'angular';
import 'angular-mocks';
import '../app/controller/isInterger';
import '../app-unitTest/intergetTest';
import '../app/controller/add';
import '../app-unitTest/addTest';
import './controller';
import '../app-unitTest/testController';
let localModule = angular.module("homeapp", ['controller']);
angular.element(document).ready(function () {
    angular.bootstrap(document,['homeapp']);
})