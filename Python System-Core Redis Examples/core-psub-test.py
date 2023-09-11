import redis
from time import sleep


# Create a connection to the Redis server
redis_host = 'localhost'  # Change this to your Redis server's host
redis_port = 7480         # Change this to your Redis server's port
redis_password = None     # Set this to your Redis server's password if it has one

# Initialize redis connection
r = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password)
p = r.pubsub()

# To subscribe to one o multiple channels.
# In this case we will to subscribe to the interface pattern channel here you will receive 
# all related to the I/O's

p.psubscribe("interface/*")

# Main loop function.
while True:
  message = p.get_message()
  if message:
    print(f"Channel: {message['channel']}, Received message: {message['data']}")
  sleep(0.01)