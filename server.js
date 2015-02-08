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
              lowerLimit: 100, 
              upperLimit: 300 
    }
  },

  work: function(my) {
    console.log("led on pin: " + my.led.pin)
    console.log("stretch on pin: " + my.stretch.pin)
    var logslider = require('./logslider')(my.devices.stretch.lowerLimit,my.devices.stretch.upperLimit)
    var analogValue = 0;
    var brightness = 0;
    my.led.brightness(brightness)

    every((sensorConfig.stretch.pollIntervalSeconds).second(), function() {
      analogValue = my.stretch.analogRead();
      console.log('Analog value => ', analogValue);
      // make http call to our 
      //POST http://sensorserver.herokuapp.com/Compositions/1/Notes

      var noteValue = logslider.logslider(analogValue)
      console.log('note value => ', noteValue);
      my.led.brightness(noteValue)
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