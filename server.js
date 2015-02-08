var Cylon = require('cylon')
var sensors = require('./config/sensors')
var outputs = require('./config/outputs')
var server = require('./config/sensorserver')
var poster = require('./poster')

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
    console.log("led on pin: " + my.led.pin)
    console.log("stretch on pin: " + my.stretch.pin)
    var stretchValue = 0;
    var flexValue = 0;
    var brightness = 0;
    my.led.brightness(brightness)

    every((sensors.pollIntervalSeconds).second(), function() {
      if(sensors.stretch.enabled) {
        var logslider = require('./logslider')(my.devices.stretch.lowerLimit,my.devices.stretch.upperLimit,1,1000)
        stretchValue = my.stretch.analogRead();
        console.log('stretch value => ', stretchValue);
        var stretchNoteValue = logslider.logslider(stretchValue)
        var note = {
          value: stretchNoteValue,
          sensor_type: sensors.stretch.description,
          time: (new Date()).getTime()
        }

        console.log("posting " + JSON.stringify(note) + " to URL" + server.url + server.notes)
        poster.postNote(note,function(err){
          if(err) {
            console.log("error posting stretch sensor note: " + JSON.stringify(err))
          }
        })
        my.stretch.on('lowerLimit', function(val) {
          console.log("Lower limit reached!");
          console.log('Analog value => ', val);
        });

        my.stretch.on('upperLimit', function(val) {
          console.log("Upper limit reached!");
          console.log('Analog value => ', val);
        });
      }

      if(sensors.flex.enabled) {
        var logslider = require('./logslider')(my.devices.flex.lowerLimit,my.devices.flex.upperLimit,1,1000)
        flexValue = my.flex.analogRead();
        console.log('flex value => ', flexValue);
        var flexNoteValue = logslider.logslider(flexValue)

        var note = {
          value: flexNoteValue,
          sensor_type: sensors.flex.description,
          time: (new Date()).getTime()
        }

        console.log("posting " + JSON.stringify(note) + " to URL" + server.url + server.notes)
        poster.postNote(note,function(err){
          if(err) {
            console.log("error posting flex sensor note: " + JSON.stringify(err))
          }
        })

        my.flex.on('lowerLimit', function(val) {
          console.log("Lower limit reached!");
          console.log('Analog value => ', val);
        });

        my.flex.on('upperLimit', function(val) {
          console.log("Upper limit reached!");
          console.log('Analog value => ', val);
        });

      }
    });


  }
}).start()