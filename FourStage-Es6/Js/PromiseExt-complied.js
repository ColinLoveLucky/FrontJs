'use strict';

$(function () {
    var promise = new Promise(function (resolve, reject) {
        console.log('promise');
        resolve();
    });
    promise.then(function () {
        console.log('resolved');
    });
    console.log("hi");
    var getJson = function getJson(url) {
        var promise = new Promise(function (resolve, reject) {
            var client = new XMLHttpRequest();
            client.open('Get', url);
            client.onreadystatechange = handler;
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            client.send();

            function handler() {
                if (this.readyState !== 4) return;
                if (this.status === 200) resolve(this.response);else {
                    reject(new Error(this.statusText));
                }
            }
        });
        return promise;
    };

    getJson("./Js/posts.json").then(function (json) {

        console.log('contents' + json.name);
    }, function (error) {
        console.log('error' + error);
    });
    getJson("/posts.json").then(function (val) {
        return console.log("fulfilled", val);
    }).catch(function (err) {
        return console.log("rejected", err);
    });

    var promises = [2, 3].map(function (id) {
        return getJson('./Js/' + id + '.json');
    });
    Promise.all(promises).then(function (posts) {
        console.log(posts);
    }).catch(function (reason) {
        console.log(reason);
    });

    var p11 = new Promise(function (resolve, reject) {
        resolve("Hello");
    }).then(function (result) {
        return result;
    });

    console.log("test");
    var p12 = new Promise(function (resolve, reject) {
        throw new Error("Error");
    }).then(function (result) {
        return result;
    });
    Promise.all([p11, p12]).then(function (result) {
        return console.log(result);
    }).catch(function (e) {
        return console.log(e);
    });
});
