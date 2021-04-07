# Overview

This sample application will send temperature data from the Syrus to AWS IoT Platform via MQTT.

SDKs used:
* [AWS IoT SDK for Javascript](https://github.com/aws/aws-iot-device-sdk-js)
* [Syrus 4](https://github.com/dctdevelop/syrus4-nodejs)

The application goes through this [example](https://github.com/aws/aws-iot-device-sdk-js#examples) from the AWS SDK docs.

These are the variables you'll need to replace:

```
var device = awsIot.device({
  keyPath: '<YourPrivateKeyPath>',
 certPath: '<YourCertificatePath>',
   caPath: '<YourRootCACertificatePath>',
 clientId: '<YourUniqueClientIdentifier>',
     host: '<YourCustomEndpoint>'
});
```

## Steps

1. Fork repository and npm install

2. Create an AWS Policy
- From the [AWS Management Console](https://console.aws.amazon.com), navigate to the `IoT Core` service.
- Navigate to **Secure** -> **Policies** and create a new Policy
    - "Action": "iot:*",
    - "Resource": "*"
    - "Effect": "Allow"

3. Create the thing on AWS IoT Core, download files, and attach a policy
- Navigate to **Manage** -> **Things** and create a new Thing, example: "syrus4giot" and click Next
- Add a certificate via the One-click certificate creation
- Download the certificate, public key, and private key files (`keyPath`, `certPath`)
- Download root CA for AWS IoT ([Amazon Root CA 1](https://www.amazontrust.com/repository/AmazonRootCA1.pem)) - [More info](https://docs.aws.amazon.com/iot/latest/developerguide/server-authentication.html) (`caPath`)

4. Test the MQTT connection
- Navigate to test, on the top right you'll get a custom endpoint for your AWS IoT (`host`)
- Publish to `syrus4Pub`
- Subscribe to `syrus4Sub`

5. Create a ZIP of the application and it's files and upload it to the Syrus 4 using the [application manager](https://syrus.digitalcomtech.com/syrdocs/syrus4/manage/syrus4-ui.html#application-manager)