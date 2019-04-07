const Formula = require("../models/Formula");

class FormulaController {
    add(req, res) {
        try {
            let f = new Formula({
                tag:req.body.tag.trim().toLowerCase(),
                code:req.body.code.trim()
            });
            f.save();
            res.send({"body":"oke"});
        }catch(e)
        {
            res.send(e.toString());
        }

    }

    get(req,res){
        Formula.get(req.body.tag.trim().toLowerCase()).then((data => res.send(JSON.stringify(data))});
       }

}
module.exports = new FormulaController();
