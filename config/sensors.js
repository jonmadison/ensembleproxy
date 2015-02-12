module.exports =  {
  "stretch": {
    "description":"adafruit stretch sensor",
    "pin": 0,
    "driver":"analogSensor",
    "lowerLimit":0,
    "upperLimit":10000,
    "enabled":true
  },
  "pressure1": {
    "description":"homemade pressure sensor",
    "pin": 1 ,
    "driver":"analogSensor",
    "lowerLimit": 0,
    "upperLimit": 1100,
    "invert":true,
    "enabled":false
  },
  "touch1": {
    "description":"touch button 1",
    "pin": 5,
    "driver": "button",
    "enabled": true
  },
  "touch2": {
    "description":"touch button 2",
    "pin": 2,
    "driver": "button",
    "enabled": true
  },
  "tempoButton": {
    "description":"tempo button",
    "pin": 7,
    "driver": "button",
    "enabled": true
  },
  "pressure2": {
    "description":"homemade pressure sensor",
    "pin": 2 ,
    "driver":"analogSensor",
    "lowerLimit": 0,
    "upperLimit": 1100,
    "invert":true,
    "enabled":false
  },
  "pressure3": {
    "description":"homemade pressure sensor",
    "pin": 3 ,
    "driver":"analogSensor",
    "lowerLimit": 0,
    "upperLimit": 1100,
    "invert":true,
    "enabled":false
  },
  "pressure4": {
    "description":"homemade pressure sensor",
    "pin": 4 ,
    "driver":"analogSensor",
    "lowerLimit": 0,
    "upperLimit": 1100,
    "invert":true,
    "enabled":false
  },
  "sonic": {
    "description":"sonic sensor",
    "enabled":false,
    "pins": [ 10,11 ],
    "driver":"analogSensor"
  },
  "softpot":{
    "description":"softpot resistor",
    "pin": 0,
    "driver":"analogSensor",
    "lowerLimit":0,
    "upperLimit":5000,
    "enabled":false
  }
}