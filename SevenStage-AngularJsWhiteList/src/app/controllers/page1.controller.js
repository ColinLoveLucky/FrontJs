
Page1Controller.$inject = ['$scope','Page1Service'];

function Page1Controller($scope,Page1Service) {
    //TODO SOMETHING
    console.log("Page1Controller");
};

angular.module('controller').controller("Page1Controller", Page1Controller);


