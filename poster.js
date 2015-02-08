var rest = require('restler')
var server = require('./config/sensorserver')

var postNote = function(note,cb) {
  rest.post(server.url + server.notes, {
    data: note
  }).on('complete',function(data,response) {
    if(response.statusCode == 200) {
      console.log('data: ', data)
      return cb(null)
    } else {
      return cb(data)
    }
  })
}

module.exports.postNote = postNote