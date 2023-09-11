
# System-Core Redis Instance Example with C

This is a simple example of how to use the System-Core Redis instance to work with the database (GET, HGET, HGETALL, LRANGE) or the message broker (PSUBSCRIBE) in your applications.

For more information about this go to [Redis](https://redis.io) official site.


For C you will be find two examples:

- ***C_Core_Database*** : This code uses the GET, HGET, HGETALL and LRANGE commands to probe the storing and read in the database.
   ```text
   usage: ./C_Core_Database
   ```

   ```text
   Response:

   GET Result: eth0
   HGET Result: 3.977
   HGETALL Result:
      Field: BAT, Value: 3.977
      Field: AN1, Value: 0
      Field: AN2, Value: 0
      Field: DAN, Value: 0
   LRANGE result:
      HEARTBEAT,1692710998
      I2C_WDT,1692710998
      HEARTBEAT,1691183255
   ```

 - ***C_Core_Psub*** : This code uses the PSUBSCRIBE command to test the function of the message broker by subscribing to a channel pattern in this case _'interface/*'_.  
   ```text
   usage: ./C_Core_Psub 
   ```
   ```text
   Response:
   
   $ ./C_Core_Psub     
   Subscribed Channel: interface/*
   Incoming Channel: interface/desired/output/OUT4
   Message: false
   Subscribed Channel: interface/*
   Incoming Channel: interface/output/OUT4
   Message: false
   Subscribed Channel: interface/*
   Incoming Channel: interface/desired/output/OUT4
   Message: true
   Subscribed Channel: interface/*
   Incoming Channel: interface/output/OUT4
   Message: true
   Subscribed Channel: interface/*
   Incoming Channel: interface/analog/BAT
   Message: 3.977

   ```
Follow these steps to be able to use redis and c in APEX:

[Application Delopment in C](https://docs.google.com/document/d/1Pt-imAuu_YNOmWnG63Nk6nFQMH91yqaVQJGSXsO4MhU/edit#heading=h.nnd3i5a45qxa)