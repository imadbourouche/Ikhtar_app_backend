const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8888
const { Pool } = require('pg')
const morgan = require('morgan')
const multer = require('multer')


// middelware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))
app.use(morgan('dev'))
app.use(express.static('public'));


// app.js
const postgres = require('postgres');
require('dotenv').config();


// conntion pooling
const pool = new Pool({
  user: 'ji_bourouche',
  host: 'ep-royal-poetry-629057.eu-central-1.aws.neon.tech',
  password: '7IT8mjBiwsqu',
  database: 'neondb',
  ssl: true,
  port: 5432,
})

async function getPgVersion() {
  pool.query('SELECT * FROM signalement', (err, result) => {
    if(err){
      console.log("Error in getting signalements ",err)      
      
    }else{
      console.log("imad")
      console.log("Getting all signalements "+result.fields)
    }
  })
}

getPgVersion();


// test server
app.get('/',(req,res)=>{
    res.status(200).send("hello in my hackathon\n");
})


// all signalements
app.get('/signalements',(req,res)=>{
  pool.query('SELECT * FROM signalement', (err, result) => {
    if(err){
      console.log("Error in getting signalements ",err)      
      res.status(500).json({"Status":"Error"});
    }else{
      console.log("Getting all signalements")
      res.status(200).json(result.rows);
    }
    //pool.end()
  })
})


// one signalement
app.get('/signalementsById/:id',(req,res)=>{
  console.log(req.params.id)
  pool.query('SELECT * FROM signalement where id=$1',[req.params.id], (err, result) => {
    if(err){
      console.log(`Error in getting one signalemet of id = ${req.params.id}`,err)      
      res.status(500).json({"Status":"Error"});
    }else{
      if(result.rows.length!=0){
        console.log(`Getting one signalemet of id = ${req.params.id}`)
        res.status(200).json(result.rows[0]);      
      }else{
        console.log(`Getting one signalemet of id = ${req.params.id} that doesn't existe`)
        res.status(404).json({"Status":"Not found"})
      }
    }
    //pool.end()
  })
})


// filter signalement by phone
app.get('/signalementsByPhone/:phone',(req,res)=>{
  console.log(req.params.phone)
  pool.query('SELECT * FROM signalement where phone=$1',[req.params.phone], (err, result) => {
    if(err){
      console.log(`Error in getting one signalemet of phone = ${req.params.phone}`,err)      
      res.status(500).json({"Status":"Error"});
    }else{
      if(result.rows.length!=0){
        console.log(`Getting one signalemet of phone = ${req.params.phone}`)
        res.status(200).json(result.rows);      
      }else{
        console.log(`Getting one signalemet of phone = ${req.params.phone} that doesn't existe`)
        res.status(404).json({"Status":"Not found"})
      }
    }
    //pool.end()
  })
})



// filter signalement by status
app.get('/signalementsByStatus/:status',(req,res)=>{
  console.log(req.params.status)
  pool.query('SELECT * FROM signalement where status=$1',[req.params.status], (err, result) => {
    if(err){
      console.log(`Error in getting one signalemet of status = ${req.params.status}`,err)      
      res.status(500).json({"Status":"Error"});
    }else{
      if(result.rows.length!=0){
        console.log(`Getting signalemet of status = ${req.params.status}`)
        res.status(200).json(result.rows);      
      }else{
        console.log(`Getting one signalemet of status = ${req.params.status} that doesn't existe`)
        res.status(404).json({"Status":"Not found"})
      }
    }
    //pool.end()
  })
})





var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+"-"+file.originalname);
  }
})

// add signalements by image, video and vocale
app.post('/uploadMedia',multer({storage: storage}).single('image'),function(req,res){
  var ret = "Signalement inserted!"
  var data = JSON.parse(req.body.data)

  var fileType ="image"

  var query="INSERT INTO signalement ( phone, status, userlocation, alertlocation, description, type ) VALUES ( $1, $2, $3, $4,$5, $6 )"
  pool.query(query,[ data.phone, 'New', data.userlocation, data.alertlocation ,"images/"+req.file.filename, fileType ],function(error,results){
     if (error) {
         console.log(error)
         res.status(500).json({"message":"server error"}) 
     }else{
      res.status(200).json(ret)
     }
     
 })
 });

// add signalements by image, video and vocale
app.post('/uploadVocal',multer({storage: storage}).single('vocal'),function(req,res){
  var ret = "Signalement inserted!"
  var data = JSON.parse(req.body.data)

  var fileType ="audio"

  var query="INSERT INTO signalement ( phone, status, userlocation, alertlocation, description, type ) VALUES ( $1, $2, $3, $4,$5, $6 )"
  pool.query(query,[ data.phone, 'New', data.userlocation, data.alertlocation ,"images/"+req.file.filename, fileType ],function(error,results){
     if (error) {
         console.log(error)
         res.status(500).json({"message":"server error"}) 
     }else{
      res.status(200).json(ret)
     }
     
 })
 });

 // add signalements by image, video and vocale
app.post('/uploadVideo',multer({storage: storage}).single('video'),function(req,res){
  var ret = "Signalement inserted!"
  var data = JSON.parse(req.body.data)

  var query="INSERT INTO signalement ( phone, status, userlocation, alertlocation, description, type ) VALUES ( $1, $2, $3, $4,$5, $6 )"
  pool.query(query,[ data.phone, 'New', data.userlocation, data.alertlocation ,"images/"+req.file.filename, 'video' ],function(error,results){
     if (error) {
         console.log(error)
         res.status(500).json({"message":"server error"}) 
     }else{
      res.status(200).json(ret)
     }
     
 })
 });



// add signalement by formulaire
app.post('/uploadText',function(req,res){
  var ret = "Signalement inserted!"
  var data = req.body
  var query="INSERT INTO signalement ( phone, status, description, type ) VALUES ( $1, $2, $3, $4 )"
  pool.query(query,[data.phone, data.status, data.description, data.type],function(error,results){
     if (error) {
         console.log(error)
         res.status(500).json({"message":"server error"}) 
     }else{
      res.status(200).json(ret)
     }
 })
 });



// admin endpoints
app.post('/login', function(req, res) {
  var data = null;
  var query = "SELECT * FROM admins WHERE telephone = $1 AND password = $2";
  var values = [req.body.phone, req.body.password];
  pool.query(query, values, function(error, results) {
    if (error) {
      console.log(error);
      res.status(500).json({message: "server error"});
    }
    console.log(results.rows.length)
    if (results.rows.length != 0) {
      data = results.rows[0];
      res.status(200).json(data);
    }else{
      res.status(200).json({"Status":"Wrong Credentials"});
      
    }
  });
});


// admin endpoints
app.post('/updateStatus', function(req, res) {
  var query = "UPDATE signalement SET status = $2 WHERE id = $1";
  console.log(req.body)
  var values = [req.body.id, req.body.status];
  console.log(req.body.id, req.body.status)
  pool.query(query, values, function(error, results) {
    if (error) {
      console.log(error);
      res.status(500).send("server error");
    }else{
      if (results.rowCount != 0) {
        res.status(200).send("Success");
      }else{
        res.status(404).send("not found");
        
      }
    }
    
  });
});


app.listen(port, () => {
    console.log(`App running on port http://127.0.0.1:${port}.`)
})
  
