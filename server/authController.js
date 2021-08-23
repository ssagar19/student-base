const User = require("./Users");
const jwt = require("jsonwebtoken");
function handleError(err) {
  console.log(err.message, err.code);
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, " net ninja secret", { expiresIn: maxAge });
};
// module.exports.signup_get = (req, res)=>{
//     res.sendFile(__dirname + '/client/signup.html');
// }
// module.exports.login_get = (req, res)=>{
//     res.sendFile(__dirname + '/client/signup.html');
// }
module.exports.signup_post = (req, res) => {
  const { gname, pw } = req.body;
//   console.log(gname, pw);
  // User.find({email:gname})

  User.find({ email: gname })
    .then((user) => {
        console.log(user);
      if (user.length >= 1) {
          console.log('mail exists');
        res.json({
          message: "Mail Exists"
        });
    
      } else {
        User.create({ email: gname, password: pw })
          .then((usr) => {
            //    const token = createToken(usr._id);
            //    res.cookie('jwt', token, {maxAge : maxAge * 1000});
            res.json({ usr: usr._id });
          })
          .catch((err) => {
            handleError(err);
            res.status(400).send("error, user not created");
          });
      }
    }).catch(err =>{
        console.log(error,'this is error');
    });

  // res.sendFile(__dirname + '/client/signup.html');
};
module.exports.login_post = (req, res) => {
  const { gname, pw } = req.body;
  User.login(gname, pw)
    .then((u) => {
      if (u === "password did not match") {
          res.json({message : 'password did not match'});
        // res.sendStatus(401);
     } else if(u === 'Cannot read property password of null') {

res.json({message: "please enter valid email and passwor"});
    } 
      else{
          console.log('this is u ')
          console.log(u);
          console.log('this is u ')
        const token = createToken(u._id);
        res.cookie("jwt", token, { maxAge: maxAge * 1000 });
        res.json({ user: u._id });
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      // console.log(err);
      console.log("jkhkhkhjkj");
    //   res.status(404);
    });
};
module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
