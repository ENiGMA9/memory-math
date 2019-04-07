const Question = require("../models/Question");
const Pool = require("../models/Pool");
const Utils = require("../Utils.js");
const mongodb = require("mongodb");

class QuestionController {
    add(req, res) {
        try {
            let q = new Question({
                question: req.body.question,
                answer: req.body.answer
            });
            let p = new Pool(q);
           q.save();
           p.save();
            res.send("Everything went OK.");
        }catch(e)
        {
            console.log(req.body.question);
            console.log(req.body.answer);
            res.send(e.toString());
        }

    }

    get(req,res){
        Pool.getCount().then(async (c)=>{
            if(c===0) {
                res.send(JSON.stringify({empty: true, questionsCount:c,totalqCount:await Question.getCount()}));
                return;
            }

            let question;
            do {
                let rand = Utils.getRandomInt(0,c-1);
                 question = await Pool.getQuestionFromPool(rand).then((result) => {
                    return result;
                });
           //      console.log(question._id + " " + lastQuestionID);
           //      console.log(question._id === lastQuestionID);
            }while(question._id.equals(lastQuestionID));
            lastQuestionID = question._id;
          //  console.log(question._id);
           // question.questionsCount = c;
      //      console.log(question.questionsCount);

            let OBJquestion = question.toObject();
            OBJquestion.questionsCount =c;
            OBJquestion.totalqCount = await Question.getCount();
            res.send(JSON.stringify(OBJquestion));
        })
    }


    initPool(req,res){
        Pool.collection.drop();
        Question.getAllQuestions().then((r)=>{
            Pool.insertMany(r).then((a)=>{
                res.send(a);
            });
        });

     // res.send(Pool.initializePool(Question.getAllQuestions()));
    }

    remove(req,res){
        Pool.removeFromPool(req.body.id).then((a)=>{res.send(a)});
    }

}
module.exports = new QuestionController();
