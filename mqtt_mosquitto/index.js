var mqtt = require('mqtt');
const { GPS, Temperature } = require("syrus4-nodejs");

var remoteTopic = "867698040012345/pub"
var remoteClient = mqtt.connect('mqtt://test.mosquitto.org:1883', {});

// sample postMessage
// var postMessage = "{\"$gnss\":{\"heading\":123,\"mph\":1,\"kph\":2,\"timestamp\":1611034335,\"hdop\":4.23,\"vdop\":0.88,\"pdop\":4.32,\"fix\":3,\"satsActive\":7,\"latitude\":25.942744,\"longitude\":-80.298705,\"speed\":0.056666712,\"accuracy\":21.150000000000002,\"altitude\":65.724,\"bearing\":185.09,\"altitudeAccuracy\":4.4,\"criteria\":\"time\"},\"$temp\":{\"aliases\":{},\"id\":\"8D01144D07DBAA28\",\"connected\":true,\"epoch\":1611033774,\"alias\":null,\"value\":23.437}}"

var postMessage = {
    "$gnss": {
        "heading": 0,
        "latitude": 0,
        "longitude": 0,
        "speed": 0
    }, 
    "$temp": {
        "alias": null,
        "id": 0,
        "value": 0,
        "epoch": 0
    }
}

async function getLocation(){
    var gps = await GPS.getCurrentPosition();
    if (gps != null) {
        gpsJson = JSON.parse(JSON.stringify(gps));
        console.log(gpsJson);
        postMessage.$gnss["heading"] = gpsJson.coords.bearing
        postMessage.$gnss["latitude"] = gpsJson.coords.latitude
        postMessage.$gnss["longitude"] = gpsJson.coords.longitude
        postMessage.$gnss["speed"] = gpsJson.coords.speed
    }
}

async function getTemperature(){
    var temp = await Temperature.getTemperatures();
    if (temp != null) {
        tempJson = JSON.parse(JSON.stringify(temp));
        console.log(tempJson);
        postMessage.$temp["alias"] = tempJson.temperatures[0].alias
        postMessage.$temp["id"] = tempJson.temperatures[0].id
        postMessage.$temp["value"] = tempJson.temperatures[0].value
        postMessage.$temp["epoch"] = tempJson.temperatures[0].epoch
    }
    var jsonString= JSON.stringify(postMessage);
    remoteClient.publish(remoteTopic, jsonString)
    console.log('Message sent!', jsonString)
}

getLocation();
getTemperature();