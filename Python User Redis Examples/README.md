
# User Redis Instance Example

This is a simple example of how to use the user Redis instance to work with the database (GET, SET, HGET,...) or the message broker (PUBLISH, PSUBSCRIBE,...) in your applications.

For more information about this go to [Redis](https://redis.io) official site.

## Python

For python you will be find three examples:

- ***user-db-read.py*** : This code uses the SET, GET, HSET, HGET, LPUSH, LRANGE and LPOP commands to probe the storing and read in the database.
- ***user-publish.py*** : This code uses the PUBLISH command to test the message broker by publishing some hardcoded messages.  
Note: To see the message published run the ***user-psub.py*** program or run
   ```bash
   redis-cli subscribe my_channel
   ```
 - ***user-psub.py*** : This code uses the PSUBSCRIBE command to test the function of the message broker by subscribing to a channel pattern.  
Note: To see any message here run the ***user-publish.py*** program or run
   ```bash
   redis-cli publish my_channel/test "my_message"
   ```  

Follow these steps to be able to use redis and python in APEX:

1. To start using Python to develop applications you'll want to add pip to install python packages. To do this you need to add the 'dev_repo' on the device using the apx-core tool.     
   ```bash
   sudo apx-core add_dev_repo
   ```  
2. Install the python package installer, this will take some time:     
   ```bash
   sudo apx-core install python3-pip
   ```  
3. Install the redis package:     
   ```bash
   pip3 install --user redis
   ```   
4. Run the ***user-db-read.py***, ***user-publish.py*** or ***user-psub.py*** 
   ```bash
   python3 database-example.py
   ``` 
