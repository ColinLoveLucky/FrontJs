export default function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(false).hashPrefix('');
    /**注册拦截*/
    $httpProvider.interceptors.push('HttpInterceptor');

    let loginState = {
        name: 'login',
        url: '/login',
        template: require("../login.html"),
        controller: 'LoginController'
    };

    let maintate = {
        name: 'main',
        url: '/main',
        template: require("../main.html")
    };

    let unauthorizedState = {
        name: 'unauthorized',
        url: '/unauthorized',
        template: require("./views/unauthorized.html")
    };
    /*
     * 主页
     * */
    let homePageState = {
        name: 'portal',
        url: "/portal",
        template: require('./views/portal.html'),
        controller: 'PortalController'
    };

    /*管控管理*/
    let page1State = {
        name: 'page1',
        url: '/page1',
        cache: false,
        template: require('./views/page1.html'),
        controller: 'Page1Controller'
    };

    //登录
    $stateProvider.state("login", loginState);

    $stateProvider.state("main", maintate);
    //无权限
    $stateProvider.state("main.unauthorized", unauthorizedState);
    //主页
    $stateProvider.state('main.portal', homePageState);
    // 管控管理
    $stateProvider.state('main.page1', page1State);

    $urlRouterProvider.otherwise("/login");
}
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

