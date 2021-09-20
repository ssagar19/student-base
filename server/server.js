var express = require("express");
var app = express();
var alienRouter = require("./router");
var cors = require('cors');
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var passport = require('passport');
require('./config/passport')(passport);
const cookieParser = require('cookie-parser');
const User = require('./Users');

app.use(passport.initialize());

const requireAuth = (req, res, next) =>{
  const token1 = req.cookies.jwt;
  var token2 = false;
  if(!req.cookies.email){
    res.send('No student is Authorised')
  }
  User.find({email : req.cookies.email}).then(val =>{
    if(val[0].role === 'admin'){
      token2 = true;
      if(token1 && token2){
        jwt.verify(token1,'kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls', (err, decodedToken) =>{
          if(err){
            console.log('huhiuiuhihiuhihu');
            console.log(err.message);
          }else{
            next();
          }
        });
          }
          else{
            res.send('404 error no student in authorised');
          }
    }

    });

};

mongoose.connect('mongodb://shu:shubhamasd@mydbcluster-shard-00-00.dbxsw.mongodb.net:27017,mydbcluster-shard-00-01.dbxsw.mongodb.net:27017,mydbcluster-shard-00-02.dbxsw.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-qfpcg2-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(() => {
    console.log("connection to database established");
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
    process.exit(-1);
  });
app.use(express.static("client"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//support parsing of application/x-www-form-urlencoded post data
app.use(cors());
app.use('/delete', alienRouter);
app.use('/logout', alienRouter);
app.use('/addSchool', requireAuth,alienRouter);
app.use('/getSchool',requireAuth, alienRouter);
// app.use("/", alienRouter);
app.use("/posts", passport.authenticate('jwt', {session: false}), alienRouter);
// app.use("/posts",alienRouter);
app.use("/myposts",requireAuth, passport.authenticate('jwt', {session: false}), alienRouter);
app.use("/create", requireAuth, passport.authenticate('jwt', {session: false}), alienRouter);
app.use(alienRouter);
app.use((req, res, next)=>{
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  console.log(error);
  res.json({
    error:{
      message: error.message
    }
  });
});
app.listen(process.env.PORT || 3000, ()=> console.log('server started at port 3000'));


// 👿 Few words from your product manager:
// The travelling recommender app works great for our customers
// However we face many stability and maintenance issues
// Make it a robust application!


// 🧚‍ Few words from your architect:
//1. Use the travelling recommender code, see 'travelling-recommender-service.js
//2. Wrap it with Get route
//3. Partition the code into layers (folders), maybe organize it better
//4. Create your custom Error object, handle errors properly
//5. Ensure that given insufficient input - 400 error is returned
//6. Ensure that when unknown error is thrown, the error is handled 
//and the process stays alive (see 'travelling-recommender-service.js constructor)
//7. Log all requests using a middleware



// 💰 Bonus: 
//1. Prevent DDOS by using a rate limiter middleware:
//https://www.npmjs.com/package/express-rate-limit
//2. Allow invoking the code using terminal 'node recommend.js Bangkok 01/01/2020'
//Use process.argv to read the arguments

// const express = require("express");
// const TravellingRecommenderService = require("./travelling-recommender-service");

// //setup
// const app = express();
// const port = process.env.PORT || 8080;
// app.listen(port);

// const router = express.Router();
// app.use(router);

// //Add routes here