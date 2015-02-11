module.exports =  {
  "stretch": {
    "description":"adafruit stretch sensor",
    "pin": 0,
    "driver":"analogSensor",
    "lowerLimit":0,
    "upperLimit":500,
    "enabled":true
  },
  "pressure": {
    "description":"homemade pressure sensor",
    "pin": 1 ,
    "driver":"analogSensor",
    "lowerLimit": 0,
    "upperLimit": 1100,
    "invert":true,
    "enabled":true
  },
  "sonic": {
    "description":"sonic sensor",
    "enabled":false,
    "pins": [ 10,11 ],
    "driver":"analogSensor",
    "enabled":true
  }
}