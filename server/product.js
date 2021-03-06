const mongoose = require('mongoose');


const marksSchema = mongoose.Schema({
    subject : {
        type:String
    },
    marks : {
        type:Number
    }
});


const productSchema = mongoose.Schema({
    fname: {type: String, required: true},
    marks : [marksSchema],
    school: {type: String, required: true}
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




module.exports = mongoose.model('Post', productSchema);