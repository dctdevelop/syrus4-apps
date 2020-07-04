const router = require('express').Router();
const fetch = require('node-fetch');
const request = require('request');
const { GPS } = require("syrus4-nodejs");
require('dotenv').config()

var gpsJson={"coords":{"latitude":0,"longitude":0}};

router.get('/', (req, res) => {  
  async function getLocation(){
    var gps = await GPS.getCurrentPosition();
    if (gps != null) {
        gpsJson = JSON.parse(JSON.stringify(gps));
        //console.log(gpsJson.coords.latitude);
        //console.log(gpsJson.coords.longitude);
    }             
  }

  getLocation();
  lat = gpsJson.coords.latitude;
  lon = gpsJson.coords.longitude;
  APPID = req.app.get('APPID');
  const url_api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}`;
  console.log (url_api);
  request.get(url_api, (error, response, body) => {
      let json = JSON.parse(body);
      //console.log (json.name);

      const city = json.name;
      const des = json.weather[0].description;
      const icon = json.weather[0].icon;
      const temp = Math.round(json.main.temp/10);
      
      res.render('index', {
        city, des, icon, temp
       });
    });
})


module.exports = router;