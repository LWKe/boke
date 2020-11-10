var express = require('express');
const session = require('express-session')

const { Users } = require('../mondel/model.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//创建注册接口
router.post('/register', function (req, res, next) {
  let userDate = {
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2
  }
  res.send(userDate)
  var userInfo = new Users(userDate);
  userInfo.save(function (err, user) {
    if (err) return console.log(err);
    console.log('注册成功');
  });
});

//创建登录接口
router.post('/login', function (req, res, next) {
  let userDate1 = {
    username: req.body.username,
    password: req.body.password,
  }
  Users.find(userDate1, function (err, person) {
    if (err) return console.log();
    if (person.length > 0) {
      console.log('登陆成功');
      //将用户名存储到session
      req.session.username = userDate1.username
      res.redirect('/')
    } else {
      console.log('登陆失败');
      res.redirect('/login')
    }
  })
})
//退出登录
router.get('/logout', function (req, res, next) {
  req.session.username = null
  res.redirect('/login')
  console.log('tuixhu');
})
module.exports = router;
