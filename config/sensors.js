module.exports = {
  "pollIntervalSeconds":0.25,
  "stretch": {
    "description":"adafruit stretch sensor",
    "pins": [ 0 ],
    "driver":"analogSensor",
    "enabled":true
  },
  "flex": {
    "description":"spectra symbol flex sensor",
    "pins": [ 1 ],
    "driver":"analogSensor",
    "enabled":true
  },
  "sonic": {
    "description":"sonic sensor"
  }
}