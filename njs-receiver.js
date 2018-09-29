const WebSocket = require('ws');
const aesjs = require('aes-js');
const sha256 = require('sha256');

const {Person} = require('./app/models/person');
const {mongoose} = require('./config/db');
 
const wss = new WebSocket.Server({ port: 8080 });
const wss2 = new WebSocket.Server({ port: 8081 });

let receivedData = '';
let array = [];
let decryptedValues = [];
let passKey = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

//saving in DB
function dbsave() {
  decryptedValues.forEach(value => {
    let objValue = JSON.parse(value);

        let person = new Person();
        person.name = objValue.name;
        person.save().then(data => console.log(data)).catch(err => console.log(err));
    });
    //streamData();
};

//decrypting each recived data
function decryption(value) {
  var encryptedBytes = aesjs.utils.hex.toBytes(value);
  var aesCtr = new aesjs.ModeOfOperation.ctr(passKey, new aesjs.Counter(1));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
  // console.log('received: %s', message);
    receivedData += message;
  });

  ws.on('close',function() {
    array = receivedData.split('|');
    array.pop();
    array.forEach(value => {
      decryptedValues.push(decryption(value));
    });
    dbsave();
    console.log(decryptedValues);
  });
 // ws.send('something');
});

//displaying data on client side
wss2.on('connection',function(ws) {
  decryptedValues.forEach(value => {
    ws.send((value));
    })
});



// function streamData(){
//   decryptedValues.forEach(value => {
//     let objValue = JSON.parse(value);

//     let personData = {
//       name:objValue.name,
//       origin:objValue.origin,
//       destinaton:objValue.destinaton
//     };
//     Person.find({'name':objValue.name}).then(person => {
//       //console.log(person);
//       if(person) {
//         person.map(data => data.stream.push(personData));
//       }
//     }).catch(err => console.log(err));
//   })
  
// };


