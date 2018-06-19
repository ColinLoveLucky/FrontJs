export default function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('');
    let loginState = {
        name: 'login',
        url: '/login',
        template: require("./login.html"),
        controller: "LoginController"
    }
    let mainState={
        name:'main',
        url:'/main',
        template:require('./main.html')
    }
    $stateProvider.state("login", loginState);
    $stateProvider.state('mian',mainState);
    $urlRouterProvider.otherwise("/login");
}
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']