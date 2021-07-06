//imports the sha1 hex library
importScripts("hashes.js");

//when the main script send a message (it passes the username and rigid), this will get executed 
onmessage = function (event)
{
    //gets the username out of the send data and puts it in the variable "username"
    var username = event.data.username;
    //gets the rigid out of the send data and puts it in the variable "rigid"
    var rigid = event.data.rigid;

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
            //shows in the console that it's requesting a new job
            console.log("Requesting a new job...\n");
            //asks for a new job
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
            console.log("New job recieved! It contains: " + event.data);
            //splits the job in multiple pieces
            var job = event.data.split(",");
            //the difficulty is piece number 2 (counting from 0), and gets selected as a variable
            var difficulty = job[2];
            //looks at the time in milliseconds, and puts it in a variable
            var startingTime = performance.now();
            //it starts hashing
            for (result=0; result < 100 * difficulty + 1; result++)
            {
                //makes a variable called "ducos1", and it contains a calculated SHA1 hash for job[0] + the result
                ducos1 = new Hashes.SHA1().hex(job[0] + result)
                //executes if the given job is the same as the calculated hash 
                if (job[1] === ducos1)
                {
                    //looks at the time in milliseconds, and puts it in a variable
                    var endingTime = performance.now();
                    //calculates the time it took to generate the hash, and divides it by 1000 (to convert it from milliseconds to seconds)
                    var timeDifference = (endingTime - startingTime) / 1000;
                    //calculates the hashrate with max 2 decimals
                    var hashrate = (result / timeDifference).toFixed(2);
                    //shows the hashrate in the console
                    console.log("The hashrate is " + hashrate + " H/s. Sending the result back to the server...");
                    //sends the result to the server
                    socket.send(result + "," + hashrate + ",Duino-JS v1.0 by Hoiboy19," + rigid)
                }
            }
        }
    }
}
