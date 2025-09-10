const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    name:{type:String, require:true},
    createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model("quiz", quizSchema);
