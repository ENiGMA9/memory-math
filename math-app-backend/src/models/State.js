const mongoose = require("mongoose");

//StateSchema
const StateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionsSkipped:{
        type: String,
        required: [true, "GIB ME"],
        minLength:3
    },
    questions: {
        type: String,
        required: [true,"Need some content here"],
        minLength:2
    }
});


const State = module.exports = mongoose.model("State", StateSchema);

module.exports.getQuestionFromPool = function(index){
    return Pool.find().skip(index-1);
};

module.exports.removeFromPool = function(question){
    Pool.remove(question).then((res)=>{
        return res;
    });
};

module.exports.initializePool = function(items){
    Pool.collection.drop();
    Pool.insert(items).then((res)=>{
        return res;
    });
};

module.exports.add = function(item){
    return Pool.insert(item);
};

