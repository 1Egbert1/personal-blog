var express = require('express')
var app = express()
var path = require('path')

app.use(express.static('./static',{
    index : 'index.html'
}))

app.listen(3000)