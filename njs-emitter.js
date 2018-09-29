const aesjs = require('aes-js');
const sha256 = require('sha256');
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080');

let data = [{name: "kiran",origin:"banglore",destination:"kurnool"},{name: "ravi",origin:"mumbai",destination:"banglore"},{name: "srinu",origin:"delhi",destination:"kolkata"},{name: "ramesh",origin:"banglore",destination:"mumbai"},{name: "balu",origin:"delhi",destination:"hyderabad"},{name: "khalid",origin:"delhi",destination:"mumbai"},{name: "sai",origin:"kadapa",destination:"tirupati"},{name: "aravind",origin:"hyderabad",destination:"visakapatnam"}];

let array = [];
let time;
let passKey = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

//encrypting each object
data.forEach(ele => {
    ele.secret_key = sha256(JSON.stringify(ele));
    
    var textBytes = aesjs.utils.utf8.toBytes(JSON.stringify(ele));
    var aesCtr = new aesjs.ModeOfOperation.ctr(passKey, new aesjs.Counter(1));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    array.push(encryptedHex)
});

ws.on('open', function open() {
    //sending random objects from array data
  time = setInterval(function() {
    let random = array[Math.floor(Math.random() * array.length)];
    ws.send(`${random}|`);
},1000);
});

setTimeout(function() {
    clearInterval(time);
    ws.close();
},10000);
 

ws.on('message', function incoming(data) {
  console.log(data);
});
