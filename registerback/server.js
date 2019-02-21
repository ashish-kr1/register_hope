var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var config = require('./config/database');
var port = process.env.PORT || 3000;
var path = require('path');
const route = require('./routes/routes');
mongoose.set('useCreateIndex', true)
mongoose.connect(config.db, { useNewUrlParser: true });//connect to mongodb
mongoose.connection.on('connected', () => {
    console.log('connected to database mongodb 27017');
});
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('error in database' + err);
    }
});

mongoose.Promise = global.Promise;

require('./config/passport')(passport);

app.use(bodyParser.json());

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());// replace the user value 


app.use('/', route);
app.get('/', (req, res) => {
    res.send("Hello welcome to ..........");
});



app.listen(port, function () {
    console.log('server is running on port no' + port);
});
