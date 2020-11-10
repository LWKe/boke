var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/boke');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log('数据库连接成功');
// });
mongoose.connect('mongodb://localhost/boke').then(
    () => { console.log('数据库连接成功') }
).catch(
    (err) => { console.log('数据库连接失败'); }
)
module.exports = mongoose