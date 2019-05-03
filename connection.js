var mongoose = require('mongoose');
var envConstants=require('./ENV_CONSTANTS');


if(process.env.NODE_ENVIROMENT==='test'){
  mongoose.connect(envConstants.url_test, {useNewUrlParser: true});

}
else {
  mongoose.connect(envConstants.url, {useNewUrlParser: true});


}

var db = mongoose.connection;
function connect(){
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
});

}   


module.exports={
    connect,
    db
}


