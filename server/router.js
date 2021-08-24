var express = require("express");
var router = express.Router();
var Post = require("./product");


const authController = require('./authController');
/**
 *@param
 */ 
///////////////////////////////////////////
// router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
// router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);


 ////////////////////////////////////////
router.post("/myposts", (req, res) => {
  var branches = ["CSE", "EEE", "ECE", "MECH"];
  var option = "";
  if (branches.includes(req.body.topthree)) {
    option = "branch";
  } else {
    option = "place";
  }
  var query = { [option]: req.body.topthree };
  Post.aggregate([
    {
      $match: query,
    },
    {
      $sort: {
        marks: -1,
      },
    },
    {
      $limit: 3,
    },
  ])
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    
    });
});

router.get('/totalLength', (req, res) =>{
  Post.find().then(d  =>{
    res.json(d.length);
    console.log(d.length);
  });
});

router.post("/posts", (req, res) => {
  const pageOptions = {
    page: parseInt(req.body.page, 10) || 0,
    limit: parseInt(req.body.limit) || 10
};
Post.find()
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .exec(function (err, doc) {
        if(err) { 
          res.status(500).json(err);
       };
        res.status(200).json(doc);
    });

});
router.post("/create", (req, res) => {
       console.log(req.body);
  if(req.body.a == '1'){
      let bulk = Post.collection.initializeUnorderedBulkOp();
      var names = ['shashank', 'kartik', 'priya', 'rajiv', 'shitiz', 'rajiv'];
      var branches = ['CSE', 'MECH', 'EEE', 'ECE', 'CIVIL'];
      var schools = ['dps1', 'dps2', 'dps3', 'dps4', 'dps5', 'dps6'];
      var places = ['shiv vihar', 'nangloi', 'rk puram', 'dehradun','krishna nagar'];
      for (var i = 2; i < 40; i++) {
        bulk.insert({
          fname: names[Math.floor(Math.random() * 6)],
          marks: Math.floor(Math.random() * 98) ,
          branch: branches[Math.floor(Math.random() * 5)],
          school: schools[Math.floor(Math.random() * 5)],
          place: places[Math.floor(Math.random() * 5)]
        });
      }
      bulk
        .execute()
        .then((c) => console.log("success", c))
        .catch((err) => console.log(err));
    }
  else{

    const { fname, marks, branch, school, place } = req.body;

  if (fname && marks && branch && school && place) {
  
    let bulk = Post.collection.initializeUnorderedBulkOp();
      bulk.insert({
        fname:fname,
        marks: marks,
        branch: branch,
        school: school,
        place: place
      });
      // bulk.find({}).delete(); // to delete all documents
      // bulk.find({}).remove(); // to delete all documents
    bulk
      .execute()
      .then((c) => console.log("success", c))
      .catch((err) => conole.log(err,'this is the error'));
}
  }
});

module.exports = router;
