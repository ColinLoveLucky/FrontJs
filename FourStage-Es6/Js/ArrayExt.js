$(function () {
    console.log(...[1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 9, 3, 3, 3, 2, 2, 3, 34, 4]);
    function addArray(x, y) {
        return x + y;
    }

    var numbers = [5, 6];

    console.log(addArray(...numbers));

    var arr1 = ['a', 'b'];
    var arr2 = ['c'];
    var arr3 = ['d', 'e'];

    console.log(...arr1, ...arr2, ...arr3);

    const [first, ...rest] = [1, 2, 3, 4, 5, 6];

    console.log(first, ...rest);

    let arrayLike = {
        '0': '1',
        '1': '2',
        '2': '3',
        length: 3
    };

    console.log(Array.from(arrayLike, x => x * x).join(','));

    console.log(Array.of(3, 11, 8).join(","));

    console.log([1, 4, -5, 10].find(item => item < 0));

    console.log(['a', 'b', 'c'].fill(7));
    console.log(['b', '4', '3'].fill(5, 1, 2));

    for (let index of ['a', 'b'].keys()) {
        console.log(index);
    }

    for (let [index, elem] of ['a', 'b'].entries()) {
        console.log(index, elem);
    }

    console.log([1,2,3].includes(2));

})