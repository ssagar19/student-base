const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({

    schoolname: {type: String, required: true},
    schoolemail: {type: String},
    city: {type: String, required: true},
    region: {type: String, required: true},
    area: {type:String}
});



// error handling and validation

//   Person.path('meta.birth').set(function (v) {
//     // this is a setter
//   });
  
//   Person.path('title').validate(function (v) {
//     return v.length > 50;

//   });

// UserSchema.pre('save', function (next) {
//     email(this.email, 'Your record has changed');
//     next();
//   });




module.exports = mongoose.model('School', schoolSchema);