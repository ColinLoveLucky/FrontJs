export default function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('');
    let loginState = {
        name: 'login',
        url: '/login',
        template: require("./view/login.html"),
        controller: "LoginController"
    };
    let mainState = {
        name: 'main',
        url: '/main',
        template: require('./view/main.html')
    };
    let customerManager = {
        name: 'customerManager',
        url: '/customerManager',
        template: require("./view/customer/customerManager.html"),
        controller: "CustomerManagerController"
    };
    let userManager = {
        name: 'userManager',
        url: '/userManager',
        template: require("./view/user/userManager.html"),
        controller: "UserManagerController"
    };
    $stateProvider.state("login", loginState);
    $stateProvider.state('main', mainState);
    $stateProvider.state("main.customerManager", customerManager);
    $stateProvider.state("main.userManager", userManager);
    $urlRouterProvider.otherwise("/login");
}
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']