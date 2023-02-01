const app = require('./app.js');
var https = require('https');
var fs = require('fs');

var https_options = {
  key: fs.readFileSync("./thebookhall.store.key"),
  cert: fs.readFileSync("./thebookhall.store.crt")
};

/*
https.createServer(https_options, app).listen(443, ()=>{
  console.log("Server listening on port", 443)
})
*/

app.listen(8000, ()=>{
  console.log("Server listening on port", 8000);
})