var mqtt = require('mqtt');
const fs = require("fs");
const { GPS } = require("syrus4-nodejs");
const ver = "App Version 1.0.10"
// console.log (ver);
// console.error(ver);

var app_data_folder = process.env.APP_DATA_FOLDER || ".";
var filePath = `${app_data_folder}/losant.json`;
if (!fs.existsSync(filePath)) {
  console.error(`Missing configuration file at: '${filePath}' `);
  process.exit();
}
var json = fs.readFileSync(filePath).toString()
json = JSON.parse(json);
const CLIENTID = json.client;
const USERNAME = json.username;
const PASSWORD = json.password;

var subTopic = 'dev/messagestx';
var pubTopic = 'dev/messagesrx';
// replace XXXXXXXXXXXXXXXXXXXXXXXX with the Losant token
var remotePubTopic='losant/XXXXXXXXXXXXXXXXXXXXXXXX/state';
var localClient = mqtt.connect('mqtt://localhost', {});
var remoteClient = mqtt.connect('mqtts://broker.losant.com', {
clientId: CLIENTID,
username: USERNAME,
password: PASSWORD,
keepalive: 10,
reconnectPeriod: 1000,
connectTimeout: 30 * 1000,
clean: true,
reschedulePings: true,
});
var postMessage = {
    "data":{
        "temp":0,
        "humidity":0,
        "batt":0,
        "location":""
    }
};
var temp;
var humidity;
var latitude;
var longitude;
var gpsJson={"coords":{"latitude":0,"longitude":0}};


//Receive from local Broker
localClient.on('message', (topic, message)=>{
    message = message.toString()
    let json = JSON.parse(message);
    postMessage.data["temp"] = json["sensor.temperature"];
    postMessage.data["humidity"] = json["air.humidity.level"];
    postMessage.data["batt"]=json["external.powersource.voltage"];
    // Get Location Function
    async function getLocation(){
        var gps = await GPS.getCurrentPosition();
        if (gps != null) {
            gpsJson = JSON.parse(JSON.stringify(gps));
            //console.log(gpsJson.coords.latitude);
            //console.log(gpsJson.coords.longitude);
        }
             
    }
    getLocation();
    //console.log (gps);  
    //latitude = gpsJson.coords.latitude;
    //longitude = gpsJson.coords.longitude;
    //postMessage.data["loc"]=latitude+","+longitude;     
    postMessage.data["location"]= `${gpsJson.coords.latitude},${gpsJson.coords.longitude}`;     
    var jsonString= JSON.stringify(postMessage);
    //console.log("Temperature: "+temperature+" Humidity: "+humidity);
    //console.log(jsonString);
    remoteClient.publish(remotePubTopic, jsonString)
    console.log('Message sent!', jsonString)    
    //remoteClient.end();
})

//Connect to Local Broker & Topic 
localClient.on('connect', ()=>{
    console.log('connected to Local Broker');
    localClient.subscribe(subTopic, function(err) {
        if(! err) {
        console.log('subscribed to Local Broker');
        //client.publish(pubTopic, 'Hello from NodeJS');
        }
    })
})

//Connect to Remote Broker & Topic 
remoteClient.on('connect', ()=>{
    console.log('connected to Remote Broker');
    remoteClient.subscribe(subTopic, function(err) {
        if(! err) {
        console.log('subscribed to Remote Broker');
            //client.publish(pubTopic, 'Hello from NodeJS');
        }
    })
})

///////////////////////////////////
