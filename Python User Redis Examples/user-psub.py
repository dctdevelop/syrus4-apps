
import redis
import time


# Create a connection to the Redis server
redis_host = 'localhost'  # Change this to your Redis server's host
redis_port = 6379         # Change this to your Redis server's port
redis_password = None     # Set this to your Redis server's password if it has one

# Initialice redis conection
r = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password)
p = r.pubsub()

# To subscribe to one o multiple channels.
p.subscribe("notification/request")

# Main loop function.
while True:
  message = p.get_message()
  if message:
    print(f"Channel: {message['channel']}, Received message: {message['data']}")
  time.sleep(0.01)