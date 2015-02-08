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
              lowerLimit: 50, 
              upperLimit: 300 
    },
    flex: {
      driver: sensors.flex.driver,
      pin: sensors.flex.pins[0],
      lowerLimit: 0,
      upperLimit: 500
    }
  },

  work: function(my) {
    console.log("led on pin: " + my.led.pin)
    console.log("stretch on pin: " + my.stretch.pin)
    var logslider = require('./logslider')(my.devices.stretch.lowerLimit,my.devices.stretch.upperLimit,1,255)
    var stretchValue = 0;
    var flexValue = 0;
    var brightness = 0;
    my.led.brightness(brightness)

    every((sensors.pollIntervalSeconds).second(), function() {
      stretchValue = my.stretch.analogRead();
      flexValue = my.flex.analogRead();
      console.log('stretch value => ', stretchValue);
      console.log('flex value => ', flexValue);

      // make http call to our 
      //POST http://sensorserver.herokuapp.com/Compositions/1/Notes
      var stretchNoteValue = logslider.logslider(stretchValue)
      var flexNoteValue = logslider.logslider(flexValue)
      
      var note = {
        value: stretchNoteValue,
        sensor_type: my.devices.stretch.description,
        time: (new Date()).getTime()
      }

      console.log("posting " + JSON.stringify(note) + " to URL" + server.url + server.notes)
      poster.postNote(note,function(err){
        if(err) {
          console.log("error posting stretch sensor note: " + err)
        }
      })

      note = {
        value: flexNoteValue,
        sensor_type: my.devices.flex.description,
        time: (new Date()).getTime()
      }

      console.log("posting " + JSON.stringify(note) + " to URL" + server.url + server.notes)
      poster.postNote(note,function(err){
        if(err) {
          console.log("error posting flex sensor note: " + err)
        }
      })

      my.led.brightness(stretchNoteValue)
    });

    my.stretch.on('lowerLimit', function(val) {
      console.log("Lower limit reached!");
      console.log('Analog value => ', val);
    });

    my.stretch.on('upperLimit', function(val) {
      console.log("Upper limit reached!");
      console.log('Analog value => ', val);
    });

  }
}).start()