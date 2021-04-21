const request = require("request");
var options = {
	'method': 'GET',
	'url': 'http://localhost:8080/gps/position'
};
request(options, function (error, response) {
	if (error) throw new Error(error);
	payload = JSON.parse(response.body);
	console.log(payload)
});

