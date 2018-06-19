
angular.module('main.filter', [])
/**广告位过滤器*/
.filter('adFilter', [function () {
	return function(input) {
		if (input && input.length > 0) {
			var content = "<ul class='ul'>";
			angular.forEach(input, function(row, index){
				if (row.url && row.url.length>0) {
					content += `<li>${row.bannerName}`;
					if (row.url.length>3) {
						angular.forEach(row.url, function(urlRow, index){
							if (index < 3) { // 只显示3个
								content += `/<a target="_blank" title=${urlRow.campaignUrl} href=${urlRow.campaignUrl} >url链接${index+1}</a>`;
							}
						})
						content += `...</li>`;
					} else {
						angular.forEach(row.url, function(urlRow, index){
							content += `/<a target="_blank" title=${urlRow.campaignUrl} href=${urlRow.campaignUrl} >url链接${index+1}</a>`;
						})
						content += `</li>`;
					}
				} else {
		            content += `<li>${row.bannerName ? row.bannerName : ''}</li>`;
		        }
			})
            content += "</ul>";
			return content;
		}
	}
}])
/**渠道过滤器*/
.filter('channelFilter', [function () {
	return function(input) {
		if (input && input.length <= 5) {
			return input.join("/");
		} else if (input && input.length > 5) {
			return input[0]+"/"+input[1]+"/"+input[2]+"/"+input[3]+"/"+input[4]+"/...";
		}
	}
}])
/**渠道名过滤器*/
.filter('refferalNameFilter', [function () {
	return function(input) {
		if (input && input.length > 0) {
			return input.join(',');
		}
	}
}])
/**渠道名和ID过滤器, 支持名称和ID搜索*/
.filter('refferalNameAndIdFilter', ['$filter', function ($filter) {
	return function(input, param) {
		if (input && param && input.length > 0) {
			if (_.toInteger(param) === 0)
				return $filter("filter")(input, {'refferalName': param});
			else
				return $filter("filter")(input, {'id': param});
		}
	}
}])
	/**国际化过滤器**/
	.filter("T", ['$translate', function($translate) {
    return function(key) {
        if(key){
            return $translate.instant(key);
        }
    };
}]);