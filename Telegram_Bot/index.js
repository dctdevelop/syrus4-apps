const app = require("express")();
const TelegramBot = require("node-telegram-bot-api");
const request = require("request");
const fs = require("fs");

const url = "http://localhost:8080";
const app_data_folder = process.env.APP_DATA_FOLDER || ".";
var filePath = `${app_data_folder}/.configuration.json`;
if (!fs.existsSync(filePath)) {
	console.error(`Missing configuration file at: '${filePath}' `);
	process.exit();
}
var json = fs.readFileSync(filePath).toString()
json = JSON.parse(json);
const TOKEN = json.token;
const options = { polling: true };
const messageOpts = {parse_mode: "markdown"};

app.listen(3000);
app.get ("/", (req,res)=>{res.send("Syrus Bot Telegram")}) 

const bot = new TelegramBot(TOKEN, options);

bot.on('text',(msg) => {
	let text = msg.text.toLocaleLowerCase();
	const mainKeyboardOpts = {
		reply_to_message_id: msg.message_id,
		parse_mode: "markdown",
		reply_markup: JSON.stringify({
			keyboard: [
				['Location','System','Network'],
				['Inputs','Outputs','Calibrate']
			],
			resize_keyboard:true,
		})
	};
	switch (text){
		case ('/start'):
			bot.sendMessage(msg.chat.id, 'Please Select a Command', mainKeyboardOpts);
			break;
		case ('location'):
			request.get(url+"/gps/position", (error, response, body) => {
				let json = JSON.parse(body);
				let latitude = json.coords.latitude;
				let longitude = json.coords.longitude;
				let speed = json.coords.speed;
				let altitude = json.coords.altitude;
			bot.sendMessage(msg.from.id, "*Syrus4G Actual Location*\nSpeed: "+Math.round(speed)+" Km/h\nAltitude: "+Math.round(altitude)+" m",messageOpts);
			bot.sendLocation(msg.from.id,latitude,longitude);
			});
			break;
		case ('system'):
			request.get(url+"/system-info", (error, response, body) => {
				let json = JSON.parse(body);
				let ramFree = json.ram.available; 
				let cpu = json.cpu.usage;
				let version = json.apexVersion;
			bot.sendMessage(msg.from.id, "*Syrus4G System State*\nFree RAM: "+Math.round(ramFree/1024)+" MB\nCPU Usage: "+Math.round(cpu)+" %\nApex Version: "+version,messageOpts);
			});
			break;
		case ('network'):
			request.get(url+"/storage/hgetall/modem_information", (error, response, body) => {
				let band = json.BAND; 
				let operator = json.OPERATOR;
				let rssi = json.RSSI;
				let sim = json.SIM_STATE;
				let esim = json.eSIM_STATE;
			if (esim === "READY"){
				bot.sendMessage(msg.from.id, "*Syrus4G Network State*\neSIM: READY\nOperator: "+operator+"\nRSSI: "+rssi+"\nBand: "+band,messageOpts);
			}
			else { bot.sendMessage(msg.from.id, "*Syrus4G Network State*\nSIM Card: READY\nOperator: "+operator+"\nRSSI: "+rssi+"\nBand: "+band,messageOpts); }
			});
			break;
		case ('inputs'):
			request.get(url+"/IO/all", (error, response, body) => {
				let json = JSON.parse(body);
				let ign = json.IGN; if (ign===true){ign="\u2705"}else{ign="\ud83c\udd7e\ufe0f"}
				let in1 = json.IN1; if (in1===true){in1="\u2705"}else{in1="\ud83c\udd7e\ufe0f"}
				let in2 = json.IN2; if (in2===true){in2="\u2705"}else{in2="\ud83c\udd7e\ufe0f"}
				let in3 = json.IN3; if (in3===true){in3="\u2705"}else{in3="\ud83c\udd7e\ufe0f"}
				let in4 = json.IN4; if (in4===true){in4="\u2705"}else{in4="\ud83c\udd7e\ufe0f"}
				let in5 = json.IN5; if (in5===true){in5="\u2705"}else{in5="\ud83c\udd7e\ufe0f"}
				let in6 = json.IN6; if (in6===true){in6="\u2705"}else{in6="\ud83c\udd7e\ufe0f"}
				let in7 = json.IN7; if (in7===true){in7="\u2705"}else{in7="\ud83c\udd7e\ufe0f"}
			bot.sendMessage(msg.from.id, "*Syrus4G Inputs State*\nIgnition: "+ign+"\nInput 1: "+in1+"\nInput 2: "+in2+"\nInput 3: "+in3+"\nInput 4: "+in4+"\nInput 5: "+in5+"\nInput 6: "+in6+"\nInput 7: "+in7,messageOpts);
			});
			break;
		case ('outputs'):
			request.get(url+"/IO/all", (error, response, body) => {
				let json = JSON.parse(body);
				let out1 = json.OUT1; if (out1===true){ign="\u2705"}else{out1="\ud83c\udd7e\ufe0f"}
				let out2 = json.OUT2; if (out2===true){out2="\u2705"}else{out2="\ud83c\udd7e\ufe0f"}
				let out3 = json.OUT3; if (out3===true){out3="\u2705"}else{out3="\ud83c\udd7e\ufe0f"}
				let out4 = json.OUT4; if (out4===true){out4="\u2705"}else{out4="\ud83c\udd7e\ufe0f"}
			bot.sendMessage(msg.from.id, "*Syrus4G Outputs State*\nOut 1: "+out1+"\nOut 2: "+out2+"\nOut 3: "+out3+"\nOut 4: "+out4,mainKeyboardOpts);
			});
			break;
		case ('calibrate'):
			const outputsKeyboardOpts = {
					reply_to_message_id: msg.message_id,
					parse_mode: "markdown",
					reply_markup: JSON.stringify({
						keyboard: [
							['Set'],
							['Query']
						],
						resize_keyboard:true,
						one_time_keyboard:true
					})
				};
				bot.sendMessage(msg.chat.id, '*Accelerometer Calibration Menu*\n Do you want to *Set* calibration or *Query* status?', outputsKeyboardOpts);
			break;
		case ('query'):
			var optionsQuery = {
				uri: url+'/exec',
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				form: {"command": "sudo apx-imu self_alignment"},
				json: true
			};
			request(optionsQuery, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					let bodyResponse = JSON.stringify(body)
					let json = JSON.parse(bodyResponse);
					let accStatus =json.ALIGNMENT_CURRENT_STATE;
					bot.sendMessage(msg.chat.id, 'Calibration Current State: '+accStatus, mainKeyboardOpts);
				}
			});
			break;
		case ('set'):
			var optionsQuery = {
				uri: url+'/exec',
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				form: {"command": "sudo apx-imu self_alignment true"},
				json: true
			};
			request(optionsQuery, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log(body)
					bot.sendMessage(msg.chat.id, 'Starting Calibration Process', mainKeyboardOpts);
				}
			});
			break;
	default: bot.sendMessage(msg.from.id, "Command Not Found")
	}
});