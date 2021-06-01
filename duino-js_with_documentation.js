//var username = "Hoiboy19"; //put your username here

//makes the variable "SHA1", that calculated a SHA1 hash
var SHA1 = new Hashes.SHA1();

//creats the variable "socketip", so the server ip can be changed easily
let socketip = "ws://51.15.127.80:14808/";

//makes a connection with the server
var soc = new WebSocket(socketip, "protocolOne");

//executes when the server sends a message (when you make a connection with the server, it automatically sends the server version (2.4 right now))
soc.onmessage = function (event)
{
    //if the message contains a job, this will get executed 
    if (isNaN(event.data))
    {
        //splits the job in multiple pieces
        var job = event.data.split(",");
        //the difficulty is piece number 2 (counting from 0), and gets selected as a variable
        var difficulty = job[2];
        //looks at the time in milliseconds, and puts it in a variable
        var t0 = performance.now();
        //it starts hasing
        for (result=0; result < 100 * difficulty + 1; result++)
        {
            //makes a variable called "ducos1", and it contains a calculated hash for job[0] + the result
            ducos1 = SHA1.hex(job[0] + result)
            //executes if the given job is the same as the calculated hash 
            if (job[1] === ducos1)
            {
                //looks at the time in milliseconds, and puts it in a variable
                var t1 = performance.now();
                //calculates the time it took to generate the hash, and divides it by 1000 (to convert it from milliseconds to seconds)
                var timeDifference = (t1 - t0) / 1000;
                //calculates the hashrate with max 2 decimals
                var hashrate = (result / timeDifference).toFixed(2);
                //sends the result to the server
                soc.send(result + "," + hashrate + ",Duino-JS v1.0 by Hoiboy19,Duino-JS")
            }
        }
    }
    //if the message contains "GOOD" (which means that the share was correct), this will get executed
    if (event.data.includes('GOOD'))
    {
        //asks for a new job
        soc.send("JOB," + username + ",LOW", encoding="utf8")
    }
    //if the message contains "BAD" (which means that the share was wrong), this will get executed
    if (event.data.includes('BAD'))
    {
        //asks for a new job
        soc.send("JOB," + username + ",LOW", encoding="utf8")
    }
}

//if it makes a connections with the server, this will get executed
soc.onopen = function (event)
{
    //requests a job
    soc.send("JOB," + username + ",LOW", encoding="utf8")
}