var chinese=require('./locale-chinese.json');
var english=require('./locale-english.json');
export default function languageConfig($translateProvider){
    $translateProvider.translations('english', english);
    $translateProvider.translations('chinese', chinese);
    $translateProvider.preferredLanguage('chinese');
    $translateProvider.useLocalStorage();
}
languageConfig.$inject=["$translateProvider"];