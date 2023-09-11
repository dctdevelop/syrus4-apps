import redis
from time import sleep, time

# Create a connection to the Redis server
redis_host = 'localhost'  # Change this to your Redis server's host
redis_port = 6379         # Change this to your Redis server's port
redis_password = None     # Set this to your Redis server's password if it has one

# Create a Redis client for publishing
redis_publisher = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password)

# Publish messages to the channel
channel = 'notification/request'

for x in range(3):
  current_time = str(int(time()))
  message = "New request at " + current_time
  print(f"Publish: {message}")
  redis_publisher.publish(channel, message)  
  sleep(2)



