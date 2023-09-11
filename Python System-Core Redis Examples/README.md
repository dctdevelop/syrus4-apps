
# System-Core Redis Instance Example

This is a simple example of how to use the System-Core Redis instance to work with the database (GET, SET, HGET,...) or the message broker (PSUBSCRIBE,...) for consults in your applications.

For more information about this go to [Redis](https://redis.io) official site.

## Python

For python you will be find three examples:

- ***core-db-read-test.py*** : This code uses the GET, HGET, HGETALL commands to probe the read from the database.

 - ***core-psub-test.py*** : This code uses the PSUBSCRIBE command to test the function of the message broker by subscribing to a apex application channel pattern, in this case _'interface/*'_ channel.  


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
4. Run the ***core-db-read-test.py*** or ***core-psub-test.py*** 
   ```bash
   python3 core-psub-test.py
   ``` 
