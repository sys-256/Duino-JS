//puts the amount of threads the user has in a variable
var userThreads = navigator.hardwareConcurrency;

//my username, which it autmattically mines for (no worries, if you specify you own username in a script below the script:src markup, it will use your username)
var username = "Hoiboy19";

//the standerd rig ID, but if you specify your own in another script, it will you that one
var rigid = "Duino-JS";

//sets the threads to 1, but if you specify your own in another script, it will use that one
let threads = 1;

function startMiner ()
{
    //checks if threads is 1 or bigger, and if it isn't it sets it to 1
    if (threads < 1)
    {
        threads = 1;
    }
    //checks if threads is 8 or smaller, and if it isn't it sets it to 8 because it won't be profitible when mining with more than 8 threads
    if (threads > 8)
    {
        threads = 8;
    }
    //checks if threads is smaller then the amount of threads the user has, and if it isn't, it sets threads to the amount of threads the user has
    if (threads > userThreads)
    {
        threads = userThreads;
    }

    //sets workerVer to 0
    let workerVer = 0;
    
    //creates threads workers (so if threads is 1, it would make 1 worker, and if threads was 12, it would make 12 workers)
    for (let workersAmount = 0; workersAmount < threads; workersAmount++)
    {
        //creates the worker  
        worker = new Worker("worker.js");
        //passes the username and rigid to the worker
        worker.postMessage({
            username: username,
            rigid: rigid,
            workerVer: workerVer
        });
    }
}
