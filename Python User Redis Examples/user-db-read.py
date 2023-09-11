import redis
from time import time

# Create a connection to the Redis server
redis_host = 'localhost'  # Change this to your Redis server's host
redis_port = 6379         # Change this to your Redis server's port
redis_password = None     # Set this to your Redis server's password if it has one

# Create a Redis client
redis_client = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password, decode_responses=True)

# Testing SET & GET commands:
# SET
current_time = str(int(time()))
redis_client.set('last_request_time', current_time)

# GET: Retrieve and print the value of previous key
value = redis_client.get('last_request_time')
print(f"Storing last request time: {value}")

# Testing HSET & HGET commands:
# Set a value in a hash set
redis_client.hset('request', 'time', current_time)
redis_client.hset('request', 'value', 'req_value')

# Get a value from the hash set
field1_value = redis_client.hget('request', 'time')
field2_value = redis_client.hget('request', 'value')
print(f"The last request was made on: {field1_value} with result: {field2_value}")

# Testing LPUSH, LPOP & LRANGE commands:
# Push items to a list
redis_client.lpush('req_values', 'value_1')
redis_client.lpush('req_values', 'value_2')
redis_client.lpush('req_values', 'value_3')

# Retrieve and print all items from the list
list_range = redis_client.lrange('req_values', 0, -1)
print(f"List items in 'req_values': {list_range}")

# Get the last item from the list.
last_item = redis_client.lpop('req_values')
print(f"Popped item from 'req_values': {last_item}")
