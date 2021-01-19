const router = require('express').Router();
const { Temperature } = require("syrus4-nodejs");

var tempJson={};

router.get('/', (req, res) => {  
  async function getTemperature(){
    var temp = await Temperature.getTemperatures();
    if (temp != null) {
        tempJson = JSON.parse(JSON.stringify(temp));
    }             
  }

  getTemperature();
  temp = tempJson.temperatures
  res.render('index', {
    temp
  });
})

module.exports = router;