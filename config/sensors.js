module.exports =  {
  "stretch": {
    "description":"adafruit stretch sensor",
    "pin": 0,
    "driver":"analogSensor",
    "lowerLimit":0,
    "upperLimit":10000,
    "enabled":false
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
  "button2": {
    "description":"my button demo",
    "pin": 2,
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
  }
}
