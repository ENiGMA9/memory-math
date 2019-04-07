const mongoose = require("mongoose");

// Question Schema
const PoolSchema = mongoose.Schema({
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

const Pool = module.exports = mongoose.model("Pool", PoolSchema);

module.exports.getQuestionFromPool = function(index){
    return Pool.findOne({}).skip(index).then((res => return res;});
};

module.exports.removeFromPool = function(questionID){
    return Pool.remove({_id:questionID}).then((res => 
        return res;
    });
};


module.exports.getCount = function(){
    return Pool.countDocuments({});
}

