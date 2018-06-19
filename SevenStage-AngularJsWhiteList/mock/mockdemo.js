
import * as constant from '../src/app/constant';

var Mock = require('mockjs');

 // import  Mock from '../node_modules/mockjs';

Mock.mock( constant.UrlName,  {
    'list|1-10': [{
        'id|+1': 1
    }]
}    );