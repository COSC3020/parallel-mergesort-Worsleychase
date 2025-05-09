const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const THRESHOLD = 2000;

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergesort(array) {
    if (array.length <= 1) return Promise.resolve(array);
    if (array.length < THRESHOLD) return Promise.resolve(array.slice().sort((a,b) => a-b));

    return new Promise((resolve, reject) => {
        let worker = new Worker(filename, {
            workerData: array
        });
        worker.once('message', resolve);
        worker.once('error', reject);
        worker.once('exit', code => {
            if (code != 0)
                reject(new Error(`Worker stopped with code ${code}`));
        });
    });
}

if (!isMainThread) {
    (async () => {
        let array = workerData;
        if (array.length <= 1) {
            parentPort.postMessage(array);
            return;
        }
        if (array.length < THRESHOLD) {
            parentPort.postMessage(array.slice().sort((a, b) => a - b));
            return;
        }
        let mid = Math.floor(array.length / 2);
        let leftP = mergesort(array.slice(0, mid));
        let rightP = mergesort(array.slice(mid));
        let [left, right] = await Promise.all([leftP, rightP]);
        parentPort.postMessage(merge(left, right));
    })();
}

module.exports = mergesort; // export to use in test