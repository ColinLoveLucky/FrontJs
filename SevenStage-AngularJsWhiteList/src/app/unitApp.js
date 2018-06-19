import angular from 'angular';
import 'angular-mocks';
import './controllers';
import '../../jsrc/isInterger';
import '../../jtest/testIsInterger';
import '../../test/unit/controllersSpec';
let localModule = angular.module("homeapp", ['controller']);
angular.element(document).ready(function () {
    angular.bootstrap(document,['homeapp']);
})