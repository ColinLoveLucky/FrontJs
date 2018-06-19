$(function () {
    for (let codePoint of 'foo')
        console.log(codePoint);
    var s = "Hello World!";
    console.log(s.startsWith('Hello'));
    console.log(s.endsWith('!'));
    console.log(s.includes('Hello'));
    console.log('x'.repeat(3));
    var count = 10;
    var sValue = `There are <b>${count}</b> items in you basket`;
    console.log(sValue);

    function fn() {
        return "Hello World";
    }

    console.log(`foo ${fn()} bar`);

    console.log(`Hello ${'World'}`);

    function tag(s, v1, v2) {
        console.log(s[0]);
        console.log(s[1]);
        console.log(s[2]);
        console.log(v1);
        console.log(v2);
    }

    var a = 5, b = 10;
    tag `Hello ${a + b} world ${a*b}`;
    
});