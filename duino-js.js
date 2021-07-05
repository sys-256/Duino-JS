//my username, which it autmattically mines for (no worries, if you specify you own username in a script below the script:src markup, it will use your username)
var username = "Hoiboy19";

//the standerd rig ID, but if you specify your own in another script, it will you that one
var rigid = "Duino-JS";

function startMiner ()
{
    //creates the worker  
    worker = new Worker("worker.js");
    //passes the username and rigid to the worker
    worker.postMessage({
        username: username,
        rigid: rigid
    });
}
