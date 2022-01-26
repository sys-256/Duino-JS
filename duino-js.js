// Get the amount of threads available
const userThreads = navigator.hardwareConcurrency;

// Default username, Rigid and amount of threads
let username = `Hoiboy19`;
let rigid = `Duino-JS`;
let threads = 1;

function startMiner() {
    // Validate the amount of threads
    if (threads < 1) {
        threads = 1;
    }
    if (threads > 8) {
        threads = 8;
    }
    if (threads > userThreads) {
        threads = userThreads;
    }

    // Set workerVer
    let workerVer = 0;

    // Loop through the amount of threads
    for (let workersAmount = 0; workersAmount < threads; workersAmount++) {
        // Create the worker  
        worker = new Worker(`worker.js`);
        // Send the username, rigid and workerVer to the worker
        worker.postMessage([username, rigid, workerVer]);
        // Add 1 to workerVer
        workerVer++;
    }
}