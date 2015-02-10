module.exports =  {
  "stretch": {
    "description":"adafruit stretch sensor",
    "pin": 0,
    "driver":"analogSensor",
    "lowerLimit":0,
    "upperLimit":500,
    "enabled":true
  },
  "flex": {
    "description":"spectra symbol flex sensor",
    "pin": 1 ,
    "driver":"analogSensor",
    "lowerLimit": 900,
    "upperLimit": 1100,
    "enabled":false
  },
  "sonic": {
    "description":"sonic sensor",
    "enabled":false,
    "pins": [ 10,11 ],
    "driver":"analogSensor",
    "enabled":true
  }
}