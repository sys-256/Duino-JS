//my username, which it autmattically mines for (no worries, if you specify you own username in a script below the script:src markup, it will use your username)
var username = "Hoiboy19";

//the standerd rig ID, but if you specify your own in another script, it will you that one
var rigid = "Duino-JS";

function startMiner ()
{
    //creates the worker  
    worker = new Worker("worker.js");
    //makes a connection with the server
    var socket = new WebSocket("wss://server.duinocoin.com:14808/");
    //executes when the server sends a message
    socket.onmessage = function (event)
    {
        //this gets executed when the server sends something including "2.", which is the server version which it automattically sends
        if (event.data.includes("2."))
        {
            //shows the server version in console
            console.log("The server is on version " + event.data);
            //asks for a job
            socket.send("JOB," + username + ",LOW")
        }
        //this gets executed when the server sends something including "GOOD", which means the share was correct
        else if (event.data.includes("GOOD"))
        {
            //shows in the console that the share was correct
            console.log(" and the share was correct!\n");
            //shows in the console that it's requesting a new job
            console.log("Requesting a new job...\n");
            //asks for a new job
            socket.send("JOB," + username + ",LOW")
        }
        //this gets executed when the server sends something including "BAD", which means the share was wrong
        else if (event.data.includes("BAD"))
        {
            //shows in the console that the share was wrong
            console.log(" and the share was wrong...\n");
            //shows in the console that it's requesting a new job
            console.log("Requesting a new job...\n");
            //asks for a new job
            socket.send("JOB," + username + ",LOW")
        }
        //this gets executed when the server sends something which doesn't agree with the one's above, which means it's probably a job
        else
        {
            //shows in console that it recieved a new job, and shows the contents
            console.log("New job recieved! It contains: " + event.data + ", sending the result to the worker.");
            //sends the data to the worker
            worker.postMessage(event.data)
            //looks at the time in milliseconds, and puts it in a variable
            var startingTime = performance.now();
            //executes when the worker gives the result
            worker.onmessage = function(event)
            {
              //shows in console that it recieved the workers message
              console.log("Result recieved!")
              //takes the data from the message and puts in the variable "result"
              var result = event.data;
              //looks at the time in milliseconds, and puts it in a variable
              var endingTime = performance.now();
              //calculates the time it took to generate the hash, and divides it by 1000 (to convert it from milliseconds to seconds)
              var timeDifference = (endingTime - startingTime) / 1000;
              //calculates the hashrate with max 2 decimals
              var hashrate = (result / timeDifference).toFixed(2);
              //shows the hashrate in the console
              console.log("The hashrate is " + hashrate + " H/s. Sending the result back to the server...");
              //sends the result to the server
              socket.send(result + "," + hashrate + ",Duino-JS v1.0 by Hoiboy19," + rigid);
            }
        }
    }
}
