## Why

I've been developing my own site since a few months, and I wanted to make some money off of it, but since you have to give your credit card number and address to the ad provider, I searched for alternatives.

Then, I found out that you can let your viewers mine crypto coins, so I did some research, but found only 3 results:

-   Coinhive, which was discontinued in 2017.
-   Minero.cc, but you could only use their wallet.
-   CoinIMP, but I couldn't really make a good profit of it.

So I stopped searching...

---

28-05-2021: I stumbled across [this video on YouTube](https://www.youtube.com/watch?v=CbpfNU7oaws). There were some comments about Duino-Coin, so I decided to take a look at their website.

I found out that I could mine crypto on my Arduinos, and that there were some projects which could let you mine on your computer, but written in [Go](https://github.com/yippiez/go-miner) or [C](https://github.com/phantom32-0/d-cpuminer). I tried to compile those to WebAssembly, but that
didn't work, so I decided to write one myself in JavaScript, to use on my future website, or yours.

## Features

-   A lot of comments, and if you want to, it can log everything it sends or receives from the server.
-   Connects to the WebSocket server via a secured protocol (WSS).
-   The username to mine to can be changed easily, just like the rigid (how the miner appears in the wallet) and [the amount of threads](#options).
-   Runs in a Web Worker, so the performance of your site won't be interrupted.
-   Is multithreaded, so you can use the full power of your pc.
-   Not blocked by any adblocker (as far as I am aware).

## Usage

To use the miner, download [duino-js.min.js, worker.min.js and hashes.min.js from the latest release](https://github.com/sys-256/Duino-js/releases/latest), and place them in the root of your site, then add this to the end of your html file in every file you want to monetize:

```html
<!--imports the Duino-JS miner-->
<script src="duino-js.min.js"></script>
<script>
    username = `Hoiboy19`; // Put your username here (e.g. revox, ericddm, snehaislove or Hoiboy19), the default is Hoiboy19.
    rigid = `Duino-JS`; // If you want to change the rig ID, you can change this. If you want to keep using "Duino-JS", you can remove this line.
    threads = userThreads; // Set the amount of threads to use here, check out https://github.com/sys-256/Duino-JS#Options for more options. The default is 1.
    startMiner(); // Starts the miner
</script>
```

Note: You need a web server like Apache or NGINX to run it, because Web Workers don't work on local files.

### Options

The `threads` variable is pretty customizable, so here are some examples:

-   `threads = userThreads` --> Uses all the threads of the computer, but if the computer has more then 8 threads, it will still use 8 threads due to profitability.
-   `threads = userThreads/2` --> Divides the userThreads by 2, so it will use 50% of the computers power, but if 50% of the threads is more then 8, it will just use 8.
-   `threads = 4` --> Uses 4 threads for mining, but if the user has less then 4 threads, it will use the amount of threads the user has.
-   `threads = 0` --> You can't use 0 threads, so Duino-JS will set it to 1.
-   `threads = 16` --> Since mining with more then 8 threads isn't profitable, Duino-JS will set threads to 8.

## License

This project is licensed under [the MIT license](https://en.wikipedia.org/wiki/MIT_License), so you can use it in whatever you want, even commercial projects. You only have to credit me with sys-256.
