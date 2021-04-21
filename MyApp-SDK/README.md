# Syrus 4 SDK Example

This application consults the temperature reading of sensors and the device's location using the SDK.

For instructions on installing it please see the [documentation](https://syrus.digitalcomtech.com/syrdocs/syrus4/develop/app-development.html#building-an-app).

After installing the ZIP on the Syrus you can view the logs under the `/data/logs/` folder

For example, assuming we named the instance of our application `sdk_sample` the logs would show

```
syrus4g@syrus-867698040023056:$ cat /data/logs/sdk_sample-out.log
{
  REDIS_CONF: { host: '127.0.0.1', port: 6379 },
  SYSTEM_REDIS_CONF: { host: '127.0.0.1', port: 7480, password: '' }
}
{
  temperatures: [
    {
      alias: 'Cold Room',
      id: '8101144D2084AA28',
      value: null,
      connected: false,
      epoch: 1619021177
    },
    {
      alias: 'hot room',
      id: '8D01144D07DBAA28',
      value: null,
      connected: false,
      epoch: 1619021177
    }
  ]
}
25.783675
-80.293561
```