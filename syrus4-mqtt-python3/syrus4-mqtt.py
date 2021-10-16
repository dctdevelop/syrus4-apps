'''
Required modules
​
`python3 -m pip install paho-mqtt`
​
run: `python3 syrus4-mqtt.py`
​
script must have access to device via network, be sure to replace SYRUS with the
.local address or the IP
​
you can subscribe with an mqtt client (mqtt-cli on mac)
​
`mqtt sub -i test -se 600 -h test.mosquitto.org -p 1883 -t {PUBLISH_TOPIC}`
​
'''

import time
from base64 import b64encode

import requests
import paho.mqtt.client as mqtt

SYRUS = "syrus-867698041102727.local"
USERNAME = "syrus4g" # should not need to be modified
PASSWORD = "123456"

PUBLISH_TOPIC = f"{SYRUS}/gps"

def on_connect(mqttc, obj, flags, rc):
	print("rc: " + str(rc))

def on_message(mqttc, obj, msg):
	print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

def on_publish(mqttc, obj, mid):
	print("mid: " + str(mid))
	pass

def on_subscribe(mqttc, obj, mid, granted_qos):
	print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(mqttc, obj, level, string):
	print(string)

# If you want to use a specific client id, use
# mqttc = mqtt.Client("client-id")
# but note that the client id must be unique on the broker. Leaving the client
# id parameter empty will generate a random id for you.
def run():
	mqttc = mqtt.Client(f"{SYRUS}")
	mqttc.on_message = on_message
	mqttc.on_connect = on_connect
	mqttc.on_publish = on_publish
	mqttc.on_subscribe = on_subscribe
	# Uncomment to enable debug messages
	# mqttc.on_log = on_log
	mqttc.connect("test.mosquitto.org", 1883, 60)
	mqttc.loop_start()

	while True:
		headers = {
			'Authorization': 'Basic {}'.format(b64encode(f"{USERNAME}:{PASSWORD}"))
		}
		gps_data = requests.get(f"http://{SYRUS}/gps/position", headers=headers)
		print(gps_data.json())
		mqttc.publish(PUBLISH_TOPIC, gps_data.text, qos=2)
		time.sleep(5)

if __name__ == '__main__':
	run()
