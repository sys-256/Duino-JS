importScripts("hashes.js");

onmessage = function (job)
{
    console.log("Worker: Job recieved!");
    var job = job.data.split(",");
    var difficulty = job[2];

    for (result=0; result < 100 * difficulty + 1; result++)
    {
        ducos1 = new Hashes.SHA1().hex(job[0] + result)
        if (job[1] === ducos1)
        {
            console.log("Share found! Sending the result (" + result + ") back to the main script!")
            postMessage(result);
        }
    }
}
