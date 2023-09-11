import redis

# Create a connection to the Redis server
redis_host = 'localhost'  # Change this to your Redis server's host
redis_port = 7480         # Change this to your Redis server's port
redis_password = None     # Set this to your Redis server's password if it has one

# Create a Redis client
redis_client = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password, decode_responses=True)

# Testing GET command:

# GET: Retrieve and print the value of previous key
value = redis_client.get('network_interface')
print(f"Network Interface: {value}")

# Testing HGETALL & HGET commands:
field1_value = redis_client.hgetall('interface_current_analog')
field2_value = redis_client.hget('interface_current_analog', 'BAT')
print(f"Analog inputs: {field1_value}")
print(f"Battery status: {field2_value}")
# Testing LRANGE commands:
# Retrieve and print all items from the list
list_range = redis_client.lrange('psm_events', 0, -1)
print(f"PSM events: {list_range}")

