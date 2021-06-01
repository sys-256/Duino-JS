var username = "Hoiboy19";
var socketip = "ws://51.15.127.80:14808/";
var SHA1 = new Hashes.SHA1();
var soc = new WebSocket(socketip, "protocolOne");
soc.onmessage = function (event)
{
    if (isNaN(event.data))
    {
        var job = event.data.split(",");
        var difficulty = job[2];
        var t0 = performance.now();
        for (result=0; result < 100 * difficulty + 1; result++)
        {
            ducos1 = SHA1.hex(job[0] + result)
            if (job[1] === ducos1)
            {
                var t1 = performance.now();
                var timeDifference = (t1 - t0) / 1000;
                var hashrate = (result / timeDifference).toFixed(2);
                soc.send(result + "," + hashrate + ",Duino-JS v1.0 by Hoiboy19,Duino-JS")
            }
        }
    }
    if (event.data.includes('GOOD'))
    {
        soc.send("JOB," + username + ",LOW", encoding="utf8")
    }
    if (event.data.includes('BAD'))
    {
        soc.send("JOB," + username + ",LOW", encoding="utf8")
    }
}
soc.onopen = function (event)
{
    soc.send("JOB," + username + ",LOW", encoding="utf8")
}
