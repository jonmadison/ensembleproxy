var Cylon = require('cylon')
var config = require('./config/config')
var sensors = require('./config/sensors')
var outputs = require('./config/outputs')
var server = require('./config/sensorserver')
var poster = require('./poster')


var readSensor = function(sensor) { 
  if(!sensor) return
  // console.log("readSensor from sensor " + JSON.stringify(sensor))
  var logslider = require('./logslider')(sensor.lowerLimit,sensor.upperLimit,1,500)
  var value = sensor.analogRead();
  var noteValue = value*5
  console.log(sensor.name + ' noteValue => ', noteValue);

  sensor.on('lowerLimit', function(val) {
    console.log("Lower limit reached!");
    console.log('Analog value => ', val);
  });

  sensor.on('upperLimit', function(val) {
    console.log("Upper limit reached!");
    console.log('Analog value => ', val);
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
      console.log('value => ', val);     
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
      console.log("error posting: " + JSON.stringify(err))
    }
  })
}

Cylon.robot({
  connections: {
    edison: { adaptor: 'intel-iot' }
  },

  devices: {
    led: { 
            driver: outputs.led.driver, 
            pin: outputs.led.pins[0]
    },
    stretch: { 
              driver: sensors.stretch.driver, 
              pin: sensors.stretch.pins[0], 
              lowerLimit: 0, 
              upperLimit: 300 
    },
    flex: {
      driver: sensors.flex.driver,
      pin: sensors.flex.pins[0],
      lowerLimit: -1000,
      upperLimit: 1000
    }
  },

  work: function(my) {
    every((config.pollInterval).second(), function(){
      readAllSensors(my);
    });
  }
}).start()

