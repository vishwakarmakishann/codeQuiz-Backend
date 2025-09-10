const { addQuestion, updateQuestion, deleteQuestion, getQuestion, getQuestions, getQuestionsByQuiz } = require('../controllers/questionController');
const express = require('express');
const questionRouter = express.Router();

questionRouter.post("/", addQuestion);
questionRouter.patch("/:id", updateQuestion);
questionRouter.delete("/:id", deleteQuestion);
questionRouter.get("/:id", getQuestion);
questionRouter.get("/quiz/:id", getQuestionsByQuiz)
questionRouter.get("/", getQuestions);

module.exports = questionRouter;