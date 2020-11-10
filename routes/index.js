var express = require('express');
var router = express.Router();
let { Writes } = require('../mondel/model')
var moment = require('moment');
/* GET home page. */
router.get('/', async function (req, res, next) {
  // Writes.find(function (err, datalist) {
  //   console.log(datalist);
  // })
  let page = req.query.page || 1
  // console.log(page);

  let data = {
    totle: '',//总页数
    currentPage: page,//当前页码
    list: [],//当前页码渲染的数据列表
  }
  let pageSize = 2//每一页显示几条

  // limit:每一页显示pageSize条数据，sort:倒序显示，skip:跳过本页之前的所有数据

  let datalist = await Writes.find().limit(pageSize).sort({ _id: -1 }).skip(pageSize * (data.currentPage - 1))
  data.totle = Math.ceil(await Writes.find().count() / pageSize)

  //页面数据
  data.list = datalist

  //转换时间
  datalist.map(item => {
    item['time'] = moment(item.id).format('YYYY/MM/DD HH:mm')
  })

  let username = req.session.username || '';
  res.render('index', { username, data: data });
});
/* 注册页面 */
router.get('/register', function (req, res, next) {
  res.render('register', {});
});
/*登录页面 */
router.get('/login', function (req, res, next) {
  res.render('login', {});
});
/*详情页面 */
router.get('/detail', async function (req, res, next) {
  var id = parseInt(req.query.id)
  // console.log(id);
  var data = await Writes.findOne({ id: id })
  let username = req.session.username || '';
  data['time'] = moment(data.id).format('YYYY/MM/DD HH:mm')
  res.render('detail', { username, data });
});

/*写文章页面 */
router.get('/write', async function (req, res, next) {
  var username = req.session.username || ''
  var id = parseInt(req.query.id)
  var page = req.query.page
  var item = {
    title: '',
    content: ''
  }
  if (id) {
    item = await Writes.findOne({ id: id })
    item.page = page
    console.log(item);
    res.render('write', { username, item })
  } else {
    res.render('write', { username, item })
  }
  // res.render('write', {});
});

module.exports = router;
