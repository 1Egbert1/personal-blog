var express = require('express')
var app = express()
var fs = require('fs')

var MongoControl = require('./databasecontrol').MongoControl
var page = new MongoControl('test', 'page')

app.get('/', function (req, res) {
    fs.readFile('./static/index.html', { encoding: 'utf-8' }, function (err, data) {
        if (err) {
            res.status(500)
            return
        }
        var tpl = data
        var html = ''
        page.find({}, function (error, result) {
            result.forEach(element => {
                html += `<li><a href="/p?_id=${element._id}">${element.title}</a></li>`
            })
            tpl = tpl.replace('<!--htmlTpl-->', html)
            console.log(html)
            res.send(tpl)
        })
    })
})

app.get('/p',function(req,res){
    var _id = req.query._id
    fs.readFile('./static/page.html',{encoding:'utf-8'},function(err,data){
        page.findById(_id,function(err,result){
            console.log(result)
            var json = result[0]
            var html = ''
            html = data.replace('<!--title-->',json.title)
                    .replace('<!--content-->',json.content)
            res.send(html)
        })
    })
})

app.listen(3000)