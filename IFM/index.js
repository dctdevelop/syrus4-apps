const app = require ('express')();
const request = require("request");
const syrusURL = "http://localhost";
const ioLinkURL = "http://192.168.1.155";
let out1,out2,out3,out4;
let status = 0;
const ver = "App Version 1.0.3"
console.log (ver);
console.error(ver);

const getOutput = () =>{
    request.get(syrusURL+"/IO/all", (error, response, body) => {
        let json = JSON.parse(body);
        //console.log(json);
        out1 = json.OUT1; 
        if (out1===true){
            out1="ON";
            if (status===0){status = 1;}

            /*var postIOLink = {
                //uri: ioLinkURL+'/cm?cmnd=Power%20On',
                uri: ioLinkURL,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                form: {"code":10,"cid":4711,"adr":"/iolinkmaster/port[1]/iolinkdevice/iolwriteacyclic","data":{"index":80,"subindex":0,"value":"01"}},
                json: true
              };*/

              var options = {
                'method': 'POST',
                'url': 'http://192.168.1.155',
                'headers': {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({"code":10,"cid":4711,"adr":"/iolinkmaster/port[1]/iolinkdevice/iolwriteacyclic","data":{"index":80,"subindex":0,"value":"01"}})
            };

            if (status===1){
              /*request(postIOLink, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  let bodyResponse = JSON.stringify(body)
                  console.log(bodyResponse) //Print Body
                  let json = JSON.parse(bodyResponse);
                  status = 2;
                    }
                });*/
                request(options, function (error, response) {
                    if (error) throw new Error(error);
                    console.log(response.body);
                    status = 2;
                  });
                }
            }else{
                out1="OFF";
                if (status===0){status = 2;}
                
                /*var postIOLink = {
                    //uri: ioLinkURL+'/cm?cmnd=Power%20Off',
                    uri: ioLinkURL,
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    form: {"code":10,"cid":4711,"adr":"/iolinkmaster/port[1]/iolinkdevice/iolwriteacyclic","data":{"index":80,"subindex":0,"value":"00"}},
                    json: true
                  };*/
                
                var options = {
                    'method': 'POST',
                    'url': 'http://192.168.1.155',
                    'headers': {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"code":10,"cid":4711,"adr":"/iolinkmaster/port[1]/iolinkdevice/iolwriteacyclic","data":{"index":80,"subindex":0,"value":"00"}})
                };

                if (status===2){
                  /*request(postIOLink, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                      let bodyResponse = JSON.stringify(body)
                      console.log(bodyResponse) //Print Body
                      let json = JSON.parse(bodyResponse);
                      status = 1;
                        }
                    });*/
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        console.log(response.body);
                        status = 1;
                      });
                }
            
            } 
        //app.get ("/", (req,res)=>{res.send("*Syrus4G Outputs State*\nOut 1: "+out1+"\nOut 2: "+out2+"\nOut 3: "+out3+"\nOut 4: "+out4,mainKeyboardOpts)});
    });
}

app.listen(8000);
app.get ("/", (req,res)=>{res.send("*Syrus4G Outputs State*\nOut 1: "+out1)});
//app.get ("/", (req,res)=>{res.send("Welcome to ioLINK")}) 
setInterval(getOutput,5000);

