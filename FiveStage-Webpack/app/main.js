// import styles from './style/main.css';
// import './style/main.css';
// require('./style/main.css');
require('./style/Go.less');
import "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
const greeter = require('./Greeter.js');
document.querySelector('#root').appendChild(greeter());
$(function () {
    $(".list-group-item").eq(0).html("免费域名注册+奉送阿里云一年免费试用");
})