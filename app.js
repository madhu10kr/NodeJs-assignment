const aesjs = require('aes-js');

const sha256 = require('sha256');

let data = [{name: "kiran",origin:"banglore",destination:"kurnool"},{name: "ravi",origin:"mumbai",destination:"banglore"},{name: "srinu",origin:"delhi",destination:"kolkata"},{name: "ramesh",origin:"banglore",destination:"mumbai"},{name: "balu",origin:"delhi",destination:"kurnool"}];



let array = [];


data.forEach(ele => {
    ele.secret_key = sha256(JSON.stringify(ele), { asBytes: true });

var textBytes = aesjs.utils.utf8.toBytes(JSON.stringify(ele));

var aesCtr = new aesjs.ModeOfOperation.ctr(ele.secret_key, new aesjs.Counter(1));
var encryptedBytes = aesCtr.encrypt(textBytes);

var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
array.push(encryptedHex)
});


// let time = setInterval(function() {
//     console.log(array[Math.floor(Math.random() * array.length)]);
// },1000);


// setTimeout(function() {
//     clearInterval(time);
// },10000);


var encryptedBytes = aesjs.utils.hex.toBytes(array[0]);

var aesCtr = new aesjs.ModeOfOperation.ctr(data[0].secret_key, new aesjs.Counter(1));

var decryptedBytes = aesCtr.decrypt(encryptedBytes);
//console.log(decryptedBytes)
var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
console.log((decryptedText));
