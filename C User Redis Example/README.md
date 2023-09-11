
# User Redis Instance Example with C

This is a simple example of how to use the user Redis instance to work with the database (GET, SET, HGET,...) or the message broker (PUBLISH, PSUBSCRIBE,...) in your applications.

For more information about this go to [Redis](https://redis.io) official site.


For C you will be find three examples:

- ***C_User_Database*** : This code uses the SET, GET, HSET, HGET, LPUSH and LRANGE commands to probe the storing and read in the database.
   ```text
   usage: ./C_User_Database
   ```

   ```text
   Response:

   GET Result: HELLOWORLD
   HGET Result: HelloWorld
   HGETALL Result:
   Field: hkey, Value: HelloWorldTwo
   LRANGE result:
   three
   two
   one
   ```

- ***C_User_Publish*** : This code uses the PUBLISH command to test the message broker by publishing the passed channel and message.  
Note: To see the message published run the ***C_User_Psub*** program or run
   ```bash
   redis-cli psubscribe test_channel/*
   ```

   ```text
   usage: ./C_User_Publish "test_channel/test" "message" 
   ```
 - ***C_User_Psub*** : This code uses the PSUBSCRIBE command to test the function of the message broker by subscribing to a channel pattern.  
Note: To see any message here run the ***C_User_Publish*** program or run
   ```bash
   redis-cli publish "test_channel/test" "message"
   ```  
   ```text
   usage: ./C_User_Psub 
   ```
Follow these steps to be able to use redis and c in APEX:

[Application Delopment in C](https://docs.google.com/document/d/1Pt-imAuu_YNOmWnG63Nk6nFQMH91yqaVQJGSXsO4MhU/edit#heading=h.nnd3i5a45qxa)