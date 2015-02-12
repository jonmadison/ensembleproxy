var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server)

var Cylon = require('cylon')
var config = require('./config/config')
var sensors = require('./config/sensors')
var outputs = require('./config/outputs')

var buttonComponent = require('./components/buttons')
var sensorComponent = require('./components/sensors')(sensors)

app.use(express.static(__dirname + '/public'))
server.listen(8080);

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
      sensorComponent.readAllSensors(my);
    })
  }
}).on('ready',function(my) {
  buttonComponent.registerCompositionHandler(my)

  io
    .of('/notes')
    .on('connection', function (socket) {
      buttonComponent.registerSocketHandlers(my, socket)
  })
})

Cylon.start()
