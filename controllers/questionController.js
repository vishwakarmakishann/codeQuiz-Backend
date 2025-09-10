const questionModel = require('../models/questionModel');
const quizModel = require('../models/quizModel');

exports.addQuestion = async (req, resp)=>{
    try {
        const {quizId, question, options, answer} = req.body;
        const ques = await questionModel.findOne({question});
        if(ques){
            return resp.status(409).json({message:"Question already exist"});
        }
        await questionModel.create({quizId, question, options, answer});
        return resp.status(201).json({message:"Question added"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.updateQuestion = async (req, resp)=>{
    try {
        const {quizId, question, options, answer} = req.body;
        const ques = await questionModel.findById(req.params.id);
        if(ques){
            await questionModel.findByIdAndUpdate(req.params.id, {quizId, question, options, answer});
            return resp.status(200).json({message:"Question updated"});
        }
        return resp.status(404).json({message:"Question not found"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.deleteQuestion = async (req, resp)=>{
    try {
        const ques = await questionModel.findById(req.params.id);
        if(ques){
            await questionModel.findByIdAndDelete(req.params.id);
            return resp.status(200).json({message:"Question deleted"});
        }
        return resp.status(404).json({message:"Question not found"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.getQuestion = async (req, resp)=>{
    try {
        const ques = await questionModel.findById(req.params.id);
        if(ques){
            return resp.status(200).json(ques);
        }
        return resp.status(404).json({message:"Question not found"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.getQuestionsByQuiz = async (req, resp)=>{
    try {
        const quiz = await quizModel.findById(req.params.id);
        if(quiz){
            // const ques = await questionModel.find({quizId:req.params.id});
            const ques = await questionModel.aggregate([
                { $match: { quizId: req.params.id } }, 
                { $sample: { size: 10 } }          
            ]);
            return resp.status(200).json(ques);
        }
        return resp.status(404).json({message:"No Question found"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.getQuestions = async (req, resp)=>{
    try {
        const ques = await questionModel.find();
        if(ques){
            return resp.status(200).json(ques);
        }
        return resp.status(404).json({message:"Question not found"});
    } catch (error) {
        console.log(error);
        
    }
}