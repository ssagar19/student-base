var express = require("express");
var app = express();
var alienRouter = require("./router");
var cors = require('cors');
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const requireAuth = (req, res, next) =>{
  const token = req.cookies.jwt;
  //check json web token exists & is veried
  if(token){
jwt.verify(token,' net ninja secret', (err, decodedToken) =>{
  if(err){
    console.log(err.message);
    // res.red
  }else{
    next();
  }
});
  }else{
    res.send('404 error');
  }
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
app.use('/logout', alienRouter);
// app.use("/", alienRouter);
app.use("/posts", requireAuth, alienRouter);
// app.use("/posts",alienRouter);
app.use("/myposts", requireAuth, alienRouter);
app.use("/create", requireAuth, alienRouter);
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



