let express = require('express');
let app = express();
let mongo = require('mongodb')
let MongoClient = mongo.MongoClient;
let mongoURL = 'mongodb+srv://test:test123@cluster0.v86nyzc.mongodb.net/?retryWrites=true&w=majority';
// let mongoURL = "mongodb://127.0.0.1:27017";
let bodyparser = require('body-parser');
let cors = require('cors');
let port = 8900;
let db;

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());

app.get('/',(req,res)=>{
    db.collection("jsondata").find({}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// end year , topic , sector , region , source ,  country , city 
app.get('/filter',(req,res)=>{
    let endyear = Number(req.query.endyear);
    let topic = (req.query.topic);
    let sector = (req.query.sector);
    let region = (req.query.region);
    let source = (req.query.source);
    let country = (req.query.country);
    let city = (req.query.city);
    let query = {};

    if(endyear) query = {end_year : endyear}
    else if(topic) query = {topic : topic}
    else if(sector) query = {sector : sector}
    else if(region) query = {region : region}
    else if(source) query = {source : source}
    else if(country) query = {country : country}
    else if(city) query = {city : city}

    db.collection('jsondata')
        .find(query)
        .toArray((err,result)=>{
        if(err) {
            throw err; 
        }
        res.send(result);
    })
})

MongoClient.connect(mongoURL,(err,client)=>{
    if(err){
        res.send(err);
        console.log('Error while connecting database')
    }
    db = client.db("assignment");
})
app.listen(port,()=>{
    console.log(`${port}`);
})
