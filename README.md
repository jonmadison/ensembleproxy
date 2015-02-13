# ensemble proxy
this code runs on your edison. it expects you have sensors actually set up on your board, and configured in ./configure/sensors.js

The aim is to make it easy to set up sensors & actuators for reading, and do
something with the data. in our case, we post info to a server we set up in the
cloud.

I recommend the [Grove Starter Kit] for maximum productivity, to start. (http://www.seeedstudio.com/depot/Grove-Starter-Kit-p-709.html)

to run, first make sure you've done an

    npm install

then do a 

    node server

