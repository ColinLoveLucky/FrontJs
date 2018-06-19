PortalController.$inject = ['$scope', 'PortalService'];

function PortalController($scope,PortalService) {
    console.log("PortalController");
}

angular.module('controller').controller("PortalController", PortalController);