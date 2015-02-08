var Cylon = require('cylon')
var sensorConfig = require('./config/sensors')
var rest = require('restler')
var server = require('./config/sensorserver')

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
              upperLimit: 300 
    }
  },

  work: function(my) {
    console.log("led on pin: " + my.led.pin)
    console.log("stretch on pin: " + my.stretch.pin)
    var logslider = require('./logslider')(my.devices.stretch.lowerLimit,my.devices.stretch.upperLimit,1,255)
    var analogValue = 0;
    var brightness = 0;
    my.led.brightness(brightness)

    every((sensorConfig.stretch.pollIntervalSeconds).second(), function() {
      analogValue = my.stretch.analogRead();
      console.log('Analog value => ', analogValue);

      // make http call to our 
      //POST http://sensorserver.herokuapp.com/Compositions/1/Notes
      var noteValue = logslider.logslider(analogValue)
      
      console.log("posting to URL" + server.url + server.notes)
      rest.post(server.url + server.notes, {
        data: {
          value: noteValue,
          sensor_type: my.devices.stretch.description,
          time: (new Date()).getTime()
        }
      }).on('complete',function(data,response) {
        if(response.statusCode == 200) {
          console.log('data: ', data)
        }
      })

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