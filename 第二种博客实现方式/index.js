var express = require('express')
var app = express()

var MongoControl = require('./databasecontrol').MongoControl

var page = new MongoControl('test','page')

app.use(express.static('./static'))

// 获取文章列表
app.get('/list',function(req,res){
    page.find({},function(error,result){
        res.send(result)
    })
})

// 获取文章内容
app.get('/page',function(req,res){
    var _id = req.query._id
    page.findById(_id,function(error,result){
        res.send(result)
    })
})

app.listen(3000)