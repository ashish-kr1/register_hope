var User = require('./schema');
var bcrypt = require('bcryptjs');

module.exports ={
    getUserById : (id, cb) =>{
    User.findById(id, cb);
},

getUserByEmail : (email, cb) =>{
    User.findOne({ email: email }, cb);
},

getByUsern :(username, cb)=> {
    User.findOne({ username: username }, cb);
},
update : (username, cb) =>{
    User.updateMany({ username: username }, cb);
},

createUser : (newUser, cb)=> {
    bcrypt.genSalt(10, function (err, salt) {
        //password with incrypted hash value
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(cb);
        })
    })
},

comparePassword : (myPassword, hash, cb) =>{
    bcrypt.compare(myPassword, hash, function (err, isMatch) {
        if (err) throw err;
        cb(null, isMatch)
    });
}
}