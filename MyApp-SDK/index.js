const { GPS, Temperature } = require("syrus4-nodejs");
async function getLocation(){
	var gps = await GPS.getCurrentPosition();
	if (gps != null) {
		gpsJson = JSON.parse(JSON.stringify(gps));
		console.log(gpsJson.coords.latitude);
		console.log(gpsJson.coords.longitude);
	}
  }
async function getTemperature(){
	var temp = await Temperature.getTemperatures();
	if (temp != null) {
		tempJson = JSON.parse(JSON.stringify(temp));
		console.log(tempJson);
	}
}
getLocation();
getTemperature();