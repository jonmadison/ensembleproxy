var rest = require('restler')
var server = require('./config/sensorserver')

var postNote = function(note,cb) {
  rest.post(server.url + server.notes, {
    data: note
  }).on('complete',function(data,response) {
    if(response.statusCode == 200) {
      // console.log('data: ', data)
      return cb(null,data)
    } else {
      return cb(response,data)
    }
  })
}

var postComposition = function(composition,cb) {
  rest.post(server.url + server.compositions, {
    data: composition
  }).on('complete',function(data,response) {
    console.log("POSTER RESPONSE: " + JSON.stringify(data))
    if(response.statusCode == 200) {
      // console.log('data: ', data)
      return cb(null,data)
    } else {
      return cb(response,data)
    }
  })
}
module.exports.postComposition = postComposition
module.exports.postNote = postNote
