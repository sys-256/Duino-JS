// Import the SHA1 library
importScripts(`hashes.js`);

onmessage = (event) => { // Execute on message from the main script
    // Gets the data from the event.data variable
    const [username, rigid, workerVer] = event.data;

    // Create a connection to the server
    let socket = new WebSocket(`wss://magi.duinocoin.com:14808/`);
    
    socket.onmessage = (event) => { // Execute on message from the server
        if (event.data.startsWith(`3.`)) { // If the server sends it's version, it's ready to send a job
            // Show the server version in console
            console.log(`CPU${workerVer}: The server is on version ${event.data}`);
            // Show in the console that we're requesting a job
            console.log(`CPU${workerVer}: Requesting a job...\n`);
            // Asks for a job
            socket.send(`JOB,${username},LOW`);
        } else if (event.data === `GOOD\n`) { // If our share is correct
            // Show in the console that the share was correct
            console.log(`CPU${workerVer}: and the share was correct!\n`);
            // Show in the console that we're requesting a new job
            console.log(`CPU${workerVer}: Requesting a new job...\n`);
            // Ask for a new job
            socket.send(`JOB,${username},LOW`);
        } else if (event.data === `BAD\n`) { // If our share is incorrect
            // Show in the console that the share was wrong
            console.log(`CPU${workerVer}: and the share was wrong...\n`);
            // Show in the console that we're requesting a new job
            console.log(`CPU${workerVer}: Requesting a new job...\n`);
            // Ask for a new job
            socket.send(`JOB,${username},LOW`);
        } else { // If the server sends a job
            // Show in console that we recieved a new job, and shows the contents
            console.log(`CPU${workerVer}: New job recieved! It contains: ${event.data}`);
            // Get the job from the server message
            const job = event.data.split(`,`);
            // Get the start time in milliseconds
            const startingTime = performance.now();
            // Start mining
            for (let result = 0; result < 100 * job[2] + 1; result++) {
                // A possibly correct SHA1 hash for job[0] + the result
                ducos1 = new Hashes.SHA1().hex(job[0] + result);
                if (job[1] === ducos1) { // If the hash is correct
                    // The time it took to generate the correct hash, then convert it from milliseconds to seconds
                    const timeDifference = (performance.now() - startingTime) / 1000;
                    // Calulate the hashrate
                    const hashrate = (result / timeDifference).toFixed(2);
                    // Print the hashrate in the console
                    console.log(`CPU${workerVer}: The hashrate is ${hashrate} H/s. Sending the result back to the server...`);
                    // Send the result back to the server
                    socket.send(`${result},${hashrate},Duino-JS v3.5 by sys-256,${rigid}`);
                    // Break the script so it stops calculating the other possible hashes
                    break;
                }
            }
        }
    }
}
