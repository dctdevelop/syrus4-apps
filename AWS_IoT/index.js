var awsIot = require('aws-iot-device-sdk');
const { Temperature } = require("syrus4-nodejs");

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//

// Sample filenames

// var device = awsIot.device({
//     keyPath: '74f8656f89-private.pem.key',
//    certPath: '74f8656f89-certificate.pem.crt',
//      caPath: 'AmazonRootCA1.pem',
//    clientId: 'syrus4giot',
//        host: 'a3somgc9e76dx2-ats.iot.us-east-1.amazonaws.com'
//            });

var device = awsIot.device({
  keyPath: '<YourPrivateKeyPath>',
 certPath: '<YourCertificatePath>',
   caPath: '<YourRootCACertificatePath>',
 clientId: '<YourUniqueClientIdentifier>',
     host: '<YourCustomEndpoint>'
});

var temperaturesJson;
var temperatures;

var cron = require('node-cron');
cron.schedule('*/1 * * * *', () => {
  console.log('Posting to AWS every 1 minute');

  getTemp();
  let alias = temperaturesJson.temperatures[0].alias;
  let value = temperaturesJson.temperatures[0].value;
  temperatures = JSON.stringify({ alias: alias, value: value});
  console.log(temperatures);
  device.publish('syrus4Pub', temperatures);
})

// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
    .on('connect', function() {
      console.log('Connected to AWS');
      device.subscribe('syrus4Sub');
    });
  
device
    .on('message', function(topic, payload) {
      console.log('message', topic, payload.toString());
    });

// Get Temperature Function
async function getTemp(){
    var temperatures = await Temperature.getTemperatures();
    if (temperatures != null) {
        temperaturesJson = JSON.parse(JSON.stringify(temperatures));
    }
}