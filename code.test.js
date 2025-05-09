// Note:
// I had a ton of trouble trying to get jsverify to work with the async stuff, so I just created my own test function. Let me know if you'd like to see some more extensive tests.

const mergesort = require("./code.js");

function isSorted(arr) {
    for (let i = 1; i < arr.length; ++i) {
        if (arr[i - 1] > arr[i]) return false;
    }
    return true;
}

async function test() {
    let testArrays = [
        [],
        [1],
        [2, 1],
        [0, 0, -5, 0],
        [5, 7, 3, 4, 23453, 9, 0],
        [10, 1, 2, 2, 9, 1231, 5, 0, 2],
        Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000))
    ];

    for (let original of testArrays) {
        let arr = original.slice();
        let sorted = await mergesort(arr);
        if (!isSorted(sorted)) {
            console.error("Test failed. Original:", original, "Result:", sorted);
            process.exit(-1);
        }
    }
    console.log("All tests passed");
}

test();