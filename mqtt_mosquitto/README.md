### MQTT Mosquitto

This application uses the node sdk to read the location and temperature information on Syrus 4, then sends the payload to mosquitto's test mqtt broker.

The first step is to install [mosquitto](https://mosquitto.org/download/) on your computer.

If you're on a Mac, after you install mosquitto, you can verify it's running with `brew services list`.

Next, you'll want to download the zip file: `mqtt_mosquitto.zip` from this repo. 

After downloading you can install it on Syrus 4 via the management tool, or apx-apps core tool. 

Once installed create an instance, in this case it's called: `mosquitto`.
With this you can navigate to: `/data/applications/<INSTANCE_NAME>`, example: `/data/applications/mosquitto`

Once in this folder do an `npm install`

After installing all the packages you'll be able to run the program. 

To view the results, go back on your computer and type the following in your command line:

```
$ mosquitto_sub -h test.mosquitto.org -t "867698040012345/pub" -v
```

now as soon as you start the program you'll see a similar message on mosquitto's broker:

```
867698040012345/pub {"$gnss":{"heading":226.6,"latitude":25.942682,"longitude":-80.298898,"speed":0.03611114000000001},"$temp":{"alias":"Cold Room","id":"8101144D2084AA28","value":21.312,"epoch":1611044059}}
```