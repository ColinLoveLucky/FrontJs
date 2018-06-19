$(function () {
    let promise = new Promise(function (resolve, reject) {
        console.log('promise');
        resolve();
    })
    promise.then(function () {
        console.log('resolved');
    })
    console.log("hi");
    var getJson = function (url) {
        var promise = new Promise(function (resolve, reject) {
            var client = new XMLHttpRequest();
            client.open('Get', url);
            client.onreadystatechange = handler;
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            client.send();

            function handler() {
                if (this.readyState !== 4)
                    return;
                if (this.status === 200)
                    resolve(this.response);
                else {
                    reject(new Error(this.statusText));
                }
            }
        });
        return promise;
    }

    getJson("./Js/posts.json").then(function (json) {

        console.log('contents' + json.name);
    }, function (error) {
        console.log('error' + error);
    });
    getJson("/posts.json").then(val => console.log("fulfilled", val)).catch(err => console.log("rejected", err));

    var promises=[2,3].map(function (id) {
        return getJson(`./Js/${id}.json`);
    })
    Promise.all(promises).then(function(posts){
        console.log(posts);
    }).catch(function (reason) {
        console.log(reason);
    })

    const p11=new Promise((resolve,reject)=>{
        resolve("Hello");
    }).then(result=>result);

    console.log("test");
    const p12=new Promise((resolve,reject)=>{
        throw new Error("Error");
    }).then(result=>result);
    Promise.all([p11,p12]).then(result=>console.log(result)).catch(e=>console.log(e));
})