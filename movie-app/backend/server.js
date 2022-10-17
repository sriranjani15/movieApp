let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

const movieRoute = require("../backend/Routes/movie.route");
const regisRoute = require("../backend/Routes/login.route");
// mongoose.set('useNewUrlParser',true);
//mongoose.set('useFindAndModify',false);
// mongoose.set('useCreateIndex',true);
// mongoose.set('useUnifiedTopology',true);

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db).then(()=>{
    console.log("Database connected Successfully!!")
},
error => {
    console.log('Could not connect to database: '+error)
})

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cors());
app.use('/movies',movieRoute);
app.use("/api/auth",regisRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port,()=>{
    console.log('Connected to port '+port);
})

app.use((req,res,next)=>{
    res.status(404).send('Error 404!');
})

app.use(function (err,req,res,next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});