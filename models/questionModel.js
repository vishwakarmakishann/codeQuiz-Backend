const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    quizId:{type:String, require:true},
    question:{type:String, require:true, unique:true},
    options:[{type:String, require:true}],
    answer:{type:String, require:true},
    explanation:{type:String, require:true}
})

module.exports = mongoose.model("question", questionSchema);