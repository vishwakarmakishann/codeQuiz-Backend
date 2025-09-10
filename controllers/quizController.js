const quizModel = require('../models/quizModel');

exports.addQuiz = async (req, resp)=>{
    try {
        const {name} = req.body;
        const quiz = await quizModel.findOne({name});
        if(quiz){
            return resp.status(409).json({message:"Quiz already exist"});
        }
        await quizModel.create({name});
        return resp.status(201).json({message:"Quiz added"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.updateQuiz = async (req, resp)=>{
    try {
        const quiz = await quizModel.findById(req.params.id);
        if(quiz){
            const {name} = req.body;
            await quizModel.findByIdAndUpdate(req.params.id, {name});
            return resp.status(200).json({message:"Quiz updated"});
        }
        return resp.status(404).json({message:"Quiz not found"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.deleteQuiz = async (req, resp)=>{
    try {
        const quiz = await quizModel.findById(req.params.id);
        if(quiz){
            await quizModel.findByIdAndDelete(req.params.id);
            return resp.status(200).json({message:"Quiz deleted"});
        }
        return resp.status(404).json({message:"Quiz not found"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.getQuiz = async (req, resp)=>{
    try {
        const quiz = await quizModel.findById(req.params.id);
        if(quiz){
            return resp.status(200).json(quiz);
        }
        return resp.status(404).json({message:"Quiz not found"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.getQuizzes = async (req, resp)=>{
    try {
        const quiz = await quizModel.find();
        if(quiz){
            return resp.status(200).json(quiz);
        }
        return resp.status(404).json({message:"No quiz found"});
    } catch (error) {
        console.log(error);
        
    }
}