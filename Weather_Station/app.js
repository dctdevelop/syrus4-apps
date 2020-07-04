const express = require('express');
const app = express();
const ver = "App Version 1.0.6"
const fs = require("fs");

var app_data_folder = process.env.APP_DATA_FOLDER || ".";
var filePath = `${app_data_folder}/configuration.json`;
if (!fs.existsSync(filePath)) {
  console.error(`Missing configuration file at: '${filePath}' `);
  process.exit();
}
var json = fs.readFileSync(filePath).toString()
json = JSON.parse(json);

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// Import Route
const weatherRoute = require('./routes/weather');
const APPID = json.appid;

// Use View Engine
app.set('view engine', 'ejs');
app.set('APPID', APPID);

// Middleware route
app.use('/', weatherRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));