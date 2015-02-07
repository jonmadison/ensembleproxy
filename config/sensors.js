module.exports = {
  "led": {
    "description":"red led",
    "pins": [ 13 ],
    "driver": "led"
  },
  "stretch": {
    "description":"adafruit stretch sensor",
    "pins": [ 0 ],
    "driver":"analogSensor",
    "pollIntervalSeconds":0.25
  },
  "sonic": {
    "description":"sonic sensor"
  }
}