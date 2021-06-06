//the sha1 hex hash calculator:
!function(){var r;function v(r,n){var t=(65535&r)+(65535&n);return(r>>16)+(n>>16)+(t>>16)<<16|65535&t}function p(r,n){return r<<n|r>>>32-n}r={SHA1:function(r){var n=!(!r||"boolean"!=typeof r.uppercase)&&r.uppercase,t=!r||"boolean"!=typeof r.utf8||r.utf8;this.hex=function(r){return function(r,n){for(var t,e=n?"0123456789ABCDEF":"0123456789abcdef",o="",f=0,u=r.length;f<u;f+=1)t=r.charCodeAt(f),o+=e.charAt(t>>>4&15)+e.charAt(15&t);return o}((r=r,function(r){for(var n=32*r.length,t="",e=0;e<n;e+=8)t+=String.fromCharCode(r[e>>5]>>>24-e%32&255);return t}(function(r,n){var t,e,o,f,u,a,h,i,c=Array(80),C=1732584193,g=-271733879,d=-1732584194,l=271733878,A=-1009589776;for(r[n>>5]|=128<<24-n%32,r[15+(n+64>>9<<4)]=n,t=0;t<r.length;t+=16){for(f=C,u=g,a=d,h=l,i=A,e=0;e<80;e+=1)c[e]=e<16?r[t+e]:p(c[e-3]^c[e-8]^c[e-14]^c[e-16],1),o=v(v(p(C,5),function(r,n,t,e){if(r<20)return n&t|~n&e;if(r<40)return n^t^e;if(r<60)return n&t|n&e|t&e;return n^t^e}(e,g,d,l)),v(v(A,c[e]),function(r){return r<20?1518500249:r<40?1859775393:r<60?-1894007588:-899497514}(e))),A=l,l=d,d=p(g,30),g=C,C=o;C=v(C,f),g=v(g,u),d=v(d,a),l=v(l,h),A=v(A,i)}return Array(C,g,d,l,A)}(function(r){for(var n=8*r.length,t=Array(r.length>>2),e=t.length,o=0;o<e;o+=1)t[o]=0;for(o=0;o<n;o+=8)t[o>>5]|=(255&r.charCodeAt(o/8))<<24-o%32;return t}(r=t?function(r){var n,t,e,o="",f=-1;if(r&&r.length)for(e=r.length;(f+=1)<e;)n=r.charCodeAt(f),t=f+1<e?r.charCodeAt(f+1):0,55296<=n&&n<=56319&&56320<=t&&t<=57343&&(n=65536+((1023&n)<<10)+(1023&t),f+=1),n<=127?o+=String.fromCharCode(n):n<=2047?o+=String.fromCharCode(192|n>>>6&31,128|63&n):n<=65535?o+=String.fromCharCode(224|n>>>12&15,128|n>>>6&63,128|63&n):n<=2097151&&(o+=String.fromCharCode(240|n>>>18&7,128|n>>>12&63,128|n>>>6&63,128|63&n));return o}(r):r),8*r.length))),n)}}},window.Hashes=r}();

//the code:
//my username, which it autmattically mines for (no worries, if you specify you own username in a script below the script:src markup, it will use your username)
var username = "Hoiboy19";

//creats the variable "socketip", so the server ip can be changed easily
var serveraddress = "wss://server.duinocoin.com:15808/";

function startMiner ()
{
    //makes a connection with the server
    var soc = new WebSocket(serveraddress);

    //executes when the server sends a message (when you make a connection with the server, it automatically sends the server version (2.4 right now))
    soc.onmessage = function (event)
    {
        if (event.data.includes("2."))
        {
            //if it sends its version, it will show up in console
            console.log("The server is on version " + event.data);
        }
        else if (event.data.includes("GOOD"))
        {
            //shows in the console that the share was correct
            console.log(" and the share was correct!\n");
            //shows in the console that it's requesting a new job
            console.log("Requesting a new job...\n");
            //asks for a new job
            soc.send("JOB," + username + ",LOW")
        }
        else if (event.data.includes("BAD"))
        {
            //shows in the console that the share was wrong
            console.log(" and the share was wrong...\n");
            //shows in the console that it's requesting a new job
            console.log("Requesting a new job...\n");
            //asks for a new job
            soc.send("JOB," + username + ",LOW")
        }
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
                    soc.send(result + "," + hashrate + ",Duino-JS v1.0 by Hoiboy19,Duino-JS")
                }
            }
        }
    }

    //if it makes a connections with the server, this will get executed
    soc.onopen = function ()
    {
        //shows in the console that it's requesting a new job
        console.log("Requesting a new job...\n");
        //requests a job
        soc.send("JOB," + username + ",LOW")
    }
}
