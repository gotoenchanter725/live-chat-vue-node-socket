const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(JSON.parse(process.env.MONGODB_URI), {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('DB connected!!!')
});