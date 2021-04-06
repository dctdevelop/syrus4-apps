I ![](RackMultipart20210406-4-1rrszkp_html_aa3527b0fdbb384c.png) FM Application v1.0.3

![](RackMultipart20210406-4-1rrszkp_html_d07c502b5a40b254.gif) ![](RackMultipart20210406-4-1rrszkp_html_2bc99914d6fe1953.gif) ![](RackMultipart20210406-4-1rrszkp_html_42850ec391a248b2.png) ![](RackMultipart20210406-4-1rrszkp_html_27f09f368d7a6938.jpg)

TCP/TAIP 192.168.1.1 I/O Link

ON/OFF

![](RackMultipart20210406-4-1rrszkp_html_db326ebf1afc1b6a.png)

This application allows you to turn a laser distance sensor on and off by using the output interface in Pegasus.

Syrus is connected to the sensor via ethernet to an I/O Link hub. You will need the ip address that is assigned to the sensor in the I/O Link hub.

All you need to do is download the &quot;Archive&quot; zip file from IFM folder in the repository. You will need to edit the index.js file with the ip address assigned to your particular sensor.

The lines to be edited are:

const ioLinkURL = &quot;http://192.168.1.155&quot;;

and the variable &quot;options&quot;

var options = {

&#39;method&#39;: &#39;POST&#39;,

&#39;url&#39;: &#39;http://192.168.1.155&#39;,

After the zip file is downloaded, and you have finished editing the variable, you can upload the file to Syrus 4 using the management tool application manager

![](RackMultipart20210406-4-1rrszkp_html_c2aac49c074389aa.png) ![](RackMultipart20210406-4-1rrszkp_html_d7be73512e3918f1.png)

Once it is installed you will be able to activate/deactivate the sensor via Pegasus output interface

![](RackMultipart20210406-4-1rrszkp_html_a2fe004ce14e922c.png)
