const mongoose = require("mongoose");

// Formula Schema
const FormulaSchema = mongoose.Schema({
    tag:{
        type: String,
        required: [true, "GIB ME"],
        minLength:1
    },
    code: {
        type: String,
        required: [true,"Need some content here"],
        minLength:2
    }
});

const Formula = module.exports = mongoose.model("Formula", FormulaSchema);

module.exports.get = function(reqTag){
    return Formula.find({"tag":reqTag}).then((elem => return elem;});
};

