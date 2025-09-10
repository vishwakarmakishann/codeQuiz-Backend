const { addQuiz, updateQuiz, deleteQuiz, getQuiz, getQuizzes } = require('../controllers/quizController');
const express = require('express');
const quizRouter = express.Router();

quizRouter.post("/", addQuiz);
quizRouter.patch("/:id", updateQuiz);
quizRouter.delete("/:id", deleteQuiz);
quizRouter.get("/:id", getQuiz);
quizRouter.get("/", getQuizzes);

module.exports = quizRouter;