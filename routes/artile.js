var express = require('express');
const session = require('express-session')
var fs = require('fs')
const { Writes } = require('../mondel/model.js')
var multiparty = require('multiparty')
var router = express.Router();
//创建写文章接口
router.post('/write', async function (req, res, next) {


    /**
     * 如果能获取id
     * updata数据库
     * 如果不能id
     */
    var id = parseInt(req.body.id)
    if (id) {
        var page = req.body.page
        var title = req.body.title
        var content = req.body.content
        const article = await Writes.findOne({ id })
        article.set({
            title: title,
            content: content,
        })
        article.save()
        res.redirect('/?page=' + page)
    } else {
        let writeDate = {
            title: req.body.title,
            content: req.body.content,
            username: req.session.username,
            id: Date.now()
        }
        // res.send(writeDate)
        var writeInfo = new Writes(writeDate)
        writeInfo.save(function (err, wrt) {
            if (err) return console.log(err);
            console.log('写入成功');
            res.redirect('/')
        })
    }
})
//上传文件接口
router.post('/upload', function (req, res, next) {
    // console.log('接口');
    var form = new multiparty.Form()
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('上传失败');
        } else {
            // console.log('成功的文件' + files);
            let file = files.upload[0]
            //读取文件
            let rs = fs.createReadStream(file.path)//读取文件在本地的位置--来自客户端的文件位置
            //新建要储存的路径--在服务端创建一个可以储存文件的目录
            let newRs = '/uploud/' + file.originalFilename
            //将新目录文件写入public里面
            let ws = fs.createWriteStream('./public' + newRs)
            //写入具体位置
            rs.pipe(ws)//边读边写
            //当文件读取关闭，监听close事件
            ws.on('close', function () {
                // ck要求返回的参数
                res.send({ uploaded: 1, url: newRs })//将文本进入数据库
            })
        }
    })
})

//删除文章
router.get('/delete', async function (req, res, next) {
    var id = parseInt(req.query.id)
    var page = req.query.page
    Writes.deleteMany({ id }, function (err) { console.log(err); })
    res.redirect('/?page=' + page)
})

module.exports = router