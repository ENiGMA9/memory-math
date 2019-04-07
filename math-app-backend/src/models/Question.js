const mongoose = require("mongoose");

// Question Schema
const QuestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question:{
        type: String,
        required: [true, "GIB ME"],
        minLength:3
    },
    answer: {
        type: String,
        required: [true,"Need some content here"],
        minLength:2
    }
});

const Question = module.exports = mongoose.model("Question", QuestionSchema);

module.exports.getAllQuestions = function(){
    return Question.find({}).then((f => return f;});
};

module.exports.getCount = function(){
    return Question.countDocuments({});
};

