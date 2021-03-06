var express = require("express");
var router = express.Router();
var Post = require("./product");
var School = require("./Schools");

const authController = require("./authController");
const adminController = require("./adminAuth");

/**
 *@param
 */
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.post("/create-admin", adminController.signup_post);
router.post("/admin", adminController.login_post);
router.get("/admin-logout", adminController.logout_get);


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

router.get('/getSchool', (req, res) =>{
School.find().select({schoolname : 1}).then(a => res.json(a));
// res.send()
});

router.post('/addSchool', (req, res) =>{
  console.log(req.body, 'dd');
  const Schoolobj = new School( 
      { schoolname: req.body.school,
    schoolemail: req.body.email,
    city: req.body.city,
    region: req.body.region,
    area: req.body.area
  });
  Schoolobj.save()
  .then(a => console.log(a))
  .catch(a => console.log(a));
});


router.get("/totalLength", (req, res) => {
  Post.find().then((d) => {
    res.json(d);
  });
});
router.post("/delete", (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  Post.findByIdAndRemove({ _id: id }).then((d) => {
    res.json(d);
  });
});

router.post("/posts", (req, res) => {
  const pageOptions = {
    page: parseInt(req.body.page, 10) || 0,
    limit: parseInt(req.body.limit) || 10,
  };
  Post.find()
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .exec(function (err, doc) {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json({ doc });
    });
});

router.post("/create", (req, res) => {
  console.log(req.body);
  if (req.body.a == "1") {
    let bulk = Post.collection.initializeUnorderedBulkOp();
    var names = ["shashank", "kartik", "priya", "rajiv", "shitiz", "rajiv"];
    var branches = ["CSE", "MECH", "EEE", "ECE", "CIVIL"];
    var schools = ["dps1", "dps2", "dps3", "dps4", "dps5", "dps6"];
    var places = [
      "shiv vihar",
      "nangloi",
      "rk puram",
      "dehradun",
      "krishna nagar",
    ];
    for (var i = 2; i < 40; i++) {
      bulk.insert({
        fname: names[Math.floor(Math.random() * 6)],
        marks: Math.floor(Math.random() * 98),
        branch: branches[Math.floor(Math.random() * 5)],
        school: schools[Math.floor(Math.random() * 5)],
        place: places[Math.floor(Math.random() * 5)],
      });
    }
    bulk
      .execute()
      .then((c) =>
        console.log("successfully inserted", c.result.nInserted, "entries")
      )
      .catch((err) => console.log(err));
  } else {
    const { fname,  school, hindi, sanskrit, sst, science, maths } = req.body;
     
    if (fname && maths && science && sst && sanskrit && hindi && school) {
      let bulk = Post.collection.initializeUnorderedBulkOp();
      bulk.insert({
        fname: fname,
        marks: [{subject:'maths', marks:maths},{subject:'science', marks:science},{subject:'sst', marks:sst},{subject:'hindi', marks:hindi},{subject:'sanskrit', marks:sanskrit}],
       school:school
       });
      // bulk.find({}).delete(); // to delete all documents
      // bulk.find({}).remove(); // to delete all documents
      bulk
        .execute()
        .then((c) =>
          console.log("successfully inserted", c.result.nInserted, "entries")
        )
        .catch((err) => conole.log(err, "this is the error"));
    }
  }
});

module.exports = router;
