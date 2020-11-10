var mongoose = require('./index.js');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
});

var writeSchema = mongoose.Schema({
    title: String,
    content: String,
    username: String,
    id: Number
});
var Writes = mongoose.model('Writes', writeSchema);
var Users = mongoose.model('Users', userSchema);
module.exports = {
    Users,
    Writes
}