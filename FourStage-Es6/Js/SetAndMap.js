$(function () {
    const set1 = new Set();
    [2, 3, 4, 5, 6, 7, 4].forEach(item => set1.add(item));
    for (let i of set1)
        console.log(i);

    const items = new Set([1, 2, 3, 4, 5, 5, 5]);
    console.log(items.size);

    console.log(set1.has(2));
    console.log(set1.delete(2));
    console.log(set1.has((2)));

    let set2 = new Set([1, 2, 3]);
    set2.forEach((value, key) => console.log(value * 2));

    console.log(Array.from(set2));

    console.log(...set2);

    let aSet = new Set([1, 2, 3]);
    let bSet = new Set([4, 3, 2]);
    let union = new Set([...aSet, ...bSet]);
    console.log(...union);

    let intersect = new Set([...aSet].filter(x => bSet.has(x)));
    console.log(...intersect);

    let difference = new Set([...aSet].filter(item => !bSet.has(item)));

    console.log(...difference);

    const mMap = new Map();
    const oMap = {p: "Hello World"};
    mMap.set(oMap, 'content');
    console.log(mMap.get(oMap));
    console.log(mMap.has(oMap));
    mMap.delete(oMap);
    console.log(mMap.has(oMap));

    const arrayMap = new Map([["name", "zhangsan"],
        ['title', "Author"]
    ]);

    console.log(arrayMap.size);
    console.log(arrayMap.has('name'));
    console.log(arrayMap.get('name'));

    const mapFor = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]);

    console.log(...mapFor.keys());
    console.log(...mapFor.values());
    console.log(...mapFor.entries());
    console.log(...mapFor);

    function mapToArrayJson(map) {
        return JSON.stringify([...map]);
    }

    let mapJson=new Map().set(true,7).set({foo:3},["abc"]);
    console.log(mapToArrayJson(mapJson));
    
   
})