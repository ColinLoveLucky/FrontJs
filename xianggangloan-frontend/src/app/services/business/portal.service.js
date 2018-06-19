/**
 * Created by chengshuailiu on 17/4/9.
 */
import {BaseApiMethod, BaseService} from './business.service';


//【自动提示,自动Loading】 第一步   添加 mixin和decorator 引入
import autotipMixin from '../mixin/autotip.mixin';
import autotip from '../decorator/autotip.decorator';
import autotipClass from '../decorator/autotipClass.decorator'
import autoloadingMixin from '../mixin/autoloading.mixin';
import autoloading from '../decorator/autoloading.decorator';
import {traits} from 'traits-decorator';


class ApiMethod extends BaseApiMethod {

    //渠道对比数据 查询渠道类型数据
    getOverViewData(day = 1) {
        return this.get("GET_DASHBOARD_OVERVIEW", "/" + day, null, {});
    }

    //渠道对比查询数据
    getFunnelTypeData() {
        return this.get("GET_DATA_DIC", "/funnel_type");
    }

    getChatTypeData() {
        return this.get("GET_DATA_DIC", "/data_type");
    }

    //获取渠道类型
    getChannelTypeData() {
        return this.get("GET_CHANNEL_TYPE");
    }

    //根据渠道类型获取渠道
    getChannelByType(typeList) {
        return this.post("GET_CHANNEL_BYTYPE", typeList);
    }

    //获取所有渠道
    getAllChannel() {
        return this.get("GET_ALL_REFFERAL");
    }

    //获取渠道对比

    getChat1(data) {
        return this.post("GET_DASHBOARD_CHAT1", data);
    }

    //获取渠道趋势
    getChat2(data) {
        return this.post("GET_DASHBOARD_CHAT2", data);
    }

    //获取渠道漏斗
    getChat3(data) {
        return this.post("GET_DASHBOARD_CHAT3", data);
    }

    //获取实时数据1
    getNowChat1(id) {
        return this.get("GET_DASHBOARD_NOWCHAT3", "/" + id);
    }

    //获取当前时间
    getCurrentTime() {
        return this.get("GET_CURRENT_DATA");
    }
}


//【自动提示,自动Loading】 第三步   添加混合类装饰器  根据需要调整
@autotipClass("Dashboard数据读取出错,${error}")
@traits(autotipMixin, autoloadingMixin)
class PortalService extends BaseService {
    constructor(UtilsService, toastr, LoadingService) {
        super(UtilsService);
        this.api = new ApiMethod(UtilsService);
        //【自动提示,自动Loading】 第四步   注入Interface
        this.setAutoTipMinxinInterface(toastr);
        this.setLoadingMinxinInterface(LoadingService);

    }

    getOverViewData(day) {
        let result = {
            contrastRatio: "0",
            registedNum: "0",
            positive: false,
        };
        return this.api.getOverViewData(day).then(function (api_result) {
            var data = api_result.result.overviewData[0].NEWREGIST;
            result.contrastRatio = data.contrastRatio;
            result.registedNum = data.registedNum;
            result.positive = !data.contrastRatio.startsWith("-");
            return result;
        }).catch(function () {
            //TODO 触发全局时间~   事件由appjs注入 或者提供配置 方便后面传入后台记录错误日志和跟踪处理
            return result;
        });
    }


    getChatTypeData() {
        let result = [];

        return this.api.getChatTypeData().then(function (api_result) {
            var hasDefault = false;
            angular.forEach(api_result.result, (item, index)=> {
                item.diabled = item.status != "enable";
                if (!hasDefault) {
                    item.selected = true;
                    hasDefault = true;
                }
                // item.selected = !item.disabled;
            });

            return api_result.result;
        }).catch(function () {
            return result.result;
        });
    }

    getFunnelTypeData() {
        let result = [];

        return this.api.getFunnelTypeData().then(function (api_result) {
            var hasDefault = false;

            angular.forEach(api_result.result, (item, index)=> {
                item.diabled = item.status != "enable";
                if (!hasDefault) {
                    item.selected = true;
                    hasDefault = true;
                }
                // item.selected = !item.disabled;
            });

            return api_result.result;
        }).catch(function () {
            return result;
        });
    }

    getChannelTypeData() {
        let result = [];

        return this.api.getChannelTypeData().then(function (api_result) {
            angular.forEach(api_result.result, (item, index)=> {
                item.diabled = item.status != "enable";
                // item.selected = !item.disabled;
            });
            return api_result.result;
        }).catch(function () {

            return result;
        });
    }

    getChannelByType(type) {
        let result = [];

        return this.api.getChannelByType(type).then(function (api_result) {
            // angular.forEach(api_result, (item, index)=> {
            //     item.diabled = item.status != "enable";
            //     // item.selected = !item.disabled;
            // });
            // if (api_result.length > 0) {
            //     api_result[0].selected = true;
            // }
            return api_result.result;
        }).catch(function () {
            return result;
        });
    }

    getAllChannel() {
        return this.api.getAllChannel().then((d)=> {
            return d.result
        });
    }


    //【自动提示,自动Loading】 第五步  对需要的方法加入修饰器
    // @autoloading
    // @autotip("渠道对比数据数据读取失败,${error}")
    getChat1(data) {
        return this.api.getChat1(data).then((d)=> {
            return d.result
        });
    }

    getChat2(data) {
        return this.api.getChat2(data).then((d)=> {
            return d.result
        });
    }

    getChat3(data) {
        return this.api.getChat3(data).then((d)=> {
            return d.result
        });
    }


    getNowChat1(id) {
        return this.api.getNowChat1(id).then((d)=> {
            return d.result;
        });
    }

    getCurrentTime() {
        return this.api.getCurrentTime().then((d)=> {
            return d.result;
        });
    }
}


//【自动提示,自动Loading】 第二步   添加 toastr LoadingService 依赖注入
angular.module('biz-services').factory("PortalService", ["UtilsService", "toastr", "LoadingService", function (UtilsService, toastr, LoadingService) {
    return new PortalService(UtilsService, toastr, LoadingService);
}]);
