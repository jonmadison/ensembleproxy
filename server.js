var Cylon = require('cylon')
var config = require('./config/config')
var sensors = require('./config/sensors')
var outputs = require('./config/outputs')
var server = require('./config/sensorserver')
var poster = require('./poster')

var scaleFactor = 5;

var readSensor = function(sensor) { 
  if(!sensor) return
  // console.log("readSensor from sensor " + JSON.stringify(sensor))
  var logslider = require('./logslider')(sensor.lowerLimit,sensor.upperLimit,1,100);

  var value;
  if(sensors[sensor.name].driver=='analogSensor') {
    value = sensor.analogRead();
  } 

  if(sensor[sensor.name].driver=='digitalSensor') {
    value = sensor.digitalRead(function(){
      console.log("got digital read")
    });
  }

  if(sensor[sensor.name].driver=='button') {
    
  }

  // var noteValue = logslider.logslider(value)
  var noteValue = logslider.logslider(value)

  if(sensors[sensor.name].invert) {
    noteValue = 1/noteValue * 100
  }

  noteValue *= scaleFactor;

  console.log(sensor.name + ' noteValue => ', noteValue);

  sensor.on('lowerLimit', function(val) {
    console.log("Lower limit reached!");
    console.log('Analog value => ', val);
  });

  sensor.on('upperLimit', function(val) {
    console.log(sensor.name + " upper limit reached!");
    console.log(sensor.name + ' Analog value => ', val);
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
      // console.log('value => ', val);     
      postSensorReading(sensor,val)
    }
  }
}

var postSensorReading = function(sensor,reading) {
  var note = {
    value: reading,
    sensor_type: sensor.description,
    time: (new Date()).getTime()
  }

  console.log("posting " + JSON.stringify(note) + " to URL" + server.url + server.notes)
  poster.postNote(note,function(err){
    if(err) {
      // console.log("error posting: " + JSON.stringify(err))
    }
  })
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
    every((config.pollInterval).second(), function(){
      readAllSensors(my);
    });
  }
}).start()

