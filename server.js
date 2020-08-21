const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path')
const { createCanvas,loadImage } = require('canvas')


app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json());
app.use(express.static('public'))

// app.get('/api', (req, res) => {
//   res.send('api endpoint')
// })

// app.post('/api',function(req,res){
//   console.log('test:' + req.body.html)
//   const c = req.body
//   const width = 1200
//   const height = 1200

//   const canvas = c
 
  // canvas.height = height
  // canvas.width = width
  // const context = canvas.getContext('2d')

  // const buffer = canvas.toBuffer('image/png')
  // fs.writeFileSync('./test.png', buffer)

// })

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});