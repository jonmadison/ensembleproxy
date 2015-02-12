var express = require('express');
var app = express();
var Cylon = require('cylon')
var config = require('./config/config')
var sensors = require('./config/sensors')
var outputs = require('./config/outputs')
var serverConfig = require('./config/sensorserver')
var poster = require('./poster')

var staticServer = require('http').Server(app)
staticServer.listen(8080)

var socket = require('./config/socket')(staticServer)
var buttons = require('./components/buttons')(socket)

app.use(express.static(__dirname + '/public'))

var scaleFactor = 5;

var readSensor = function(sensor) {
  if(!sensor) return
  if(sensors[sensor.name].driver=='button') return

  console.log("readSensor from sensor " + JSON.stringify(sensor))
  var logslider = require('./logslider')(sensor.lowerLimit,sensor.upperLimit,1,100);

  var value;
  if(sensors[sensor.name].driver=='analogSensor') {
    value = sensor.analogRead();
    console.log("got analog read")
  }

  if(sensors[sensor.name].driver=='digitalSensor') {
    value = sensor.digitalRead(function(){
      console.log("got digital read")
    });
  }

  // var noteValue = logslider.logslider(value)
  var noteValue = logslider.logslider(value)

  if(sensors[sensor.name].invert) {
    noteValue = 1/noteValue * 100
  }

  noteValue *= scaleFactor;

  console.log(sensor.name + ' noteValue => ', noteValue)

  sensor.on('lowerLimit', function(val) {
    console.log(sensor.name + " lower limit reached, value => ", val)
  });

  sensor.on('upperLimit', function(val) {
    console.log(sensor.name + " upper limit reached, value => ", val)
  });
  return noteValue
}

var readAllSensors = function(my) {
  for(var sensorName in sensors) {
    var value = 0;
    var sensor = sensors[sensorName];

    if(!sensors.hasOwnProperty(sensorName)) continue
    if(sensors[sensorName].enabled) {
      val = readSensor(my[sensorName])
      if (val != null) {
        postSensorReading(sensor,val);
      }
    }
  }
}

var postSensorReading = function(sensor,reading) {
  var note = {
    value: reading,
    sensor_type: sensor.description,
    time: (new Date()).getTime()
  }

  console.log("posting " + JSON.stringify(note) + " to URL" + serverConfig.url + serverConfig.notes)
  poster.postNote(note,function(err){
    if(err) {
      // console.log("error posting: " + JSON.stringify(err))
    }
  })

  if (socket) {
    socket.emit('noteReceived', note);
  }
}

var getDevices = function() {
  var deviceObj = {}
  for(var sensorName in sensors) {
    var sensor = sensors[sensorName]
    if(sensors[sensorName].enabled) deviceObj[sensorName] = sensors[sensorName]
  }
  console.log("getDevices setting up: " + JSON.stringify(deviceObj))
  return deviceObj
}

Cylon.robot({
  connections: {
    edison: { adaptor: 'intel-iot' }
  },

  devices: getDevices(),

  work: function(my) {
    every((config.pollInterval).second(), function() {
      readAllSensors(my);
    })
  }
}).on('ready',function(my) { 
  buttons.registerCompositionHandler(my)
}).on('ready',function(my) { 
  buttons.registerSocketHandlers(my)
})

Cylon.start()
