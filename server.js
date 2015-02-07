var Cylon = require('cylon')
var sensorConfig = require('./config/sensors')

Cylon.robot({
  connections: {
    edison: { adaptor: 'intel-iot' }
  },

  devices: {
    led: { 
            driver: sensorConfig.led.driver, 
            pin: sensorConfig.led.pins[0]
    },
    stretch: { 
              driver: sensorConfig.stretch.driver, 
              pin: sensorConfig.stretch.pins[0], 
              lowerLimit: 50, 
              upperLimit: 200 
    }
  },

  work: function(my) {
    var logslider = require('./config/logslider')(devices.stretch.lowerLimit,devices.stretch.upperLimit)
    var analogValue = 0;
    var brightness = 0;
    my.led.brightness(brightness)

    every((sensorConfig.stretch.pollIntervalSeconds).second(), function() {
      analogValue = my.sensor.analogRead();
      console.log('Analog value => ', analogValue);
      // make http call to our 
      //POST http://sensorserver.herokuapp.com/Compositions/1/Notes

      var noteValue = logslider(analogValue)
      console.log('note value => ', noteValue);
      my.led.brightness(noteValue)
    });

    my.sensor.on('lowerLimit', function(val) {
      console.log("Lower limit reached!");
      console.log('Analog value => ', val);
    });

    my.sensor.on('upperLimit', function(val) {
      console.log("Upper limit reached!");
      console.log('Analog value => ', val);
    });

  }
}).start()