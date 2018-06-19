function A() {
    $.getJSON('../common/config/addressConfig.js', function(data){
        console.log(1);
        console.log(data);
    });
}
module.exports=A;
