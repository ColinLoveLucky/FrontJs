/**
 * Created by HaihuaHuang on 2017/10/13.
 */

import english from './i18n/en.json';
import chinese from './i18n/zh.json';

export default function config($translateProvider) {

    $translateProvider.translations('en', english);
    $translateProvider.translations('zh', chinese);

    /* translateProvider.translations('zh', {
     'T_USERNAME': '用户',
     'T_USERPWD': '密码',
     'T_LOGIN': '登录'
     });

     $translateProvider.translations('en', {
     'T_USERNAME': 'User Name',
     'T_USERPWD': 'Password',
     'T_LOGIN': 'Login'
     });

     $translateProvider.useStaticFilesLoader({
     prefix: '/i18n/',
     suffix: '.json'
     });*/

    var lang = window.localStorage.lang || 'zh';
    $translateProvider.preferredLanguage(lang);
    $translateProvider.useLocalStorage();

}
config.$inject = ['$translateProvider'];

