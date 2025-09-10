const connectDB = require('./config/db');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const quizRouter = require('./routes/quizRouter');
const questionRouter = require('./routes/questionRouter');
const session = require('express-session');

const app = express();
dotenv.config();
connectDB();
app.use(cors({origin: "https://codequiz-ashy.vercel.app",credentials: true}));
app.use(session({
    secret:"secret-key",
    resave:false,
    saveUninitialized:false,
    cookie: {
    httpOnly: true,
    secure: true,        
    sameSite: 'none' 
  }
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth", userRouter);
app.use("/quiz", quizRouter);
app.use("/question", questionRouter);

app.get("/session", (req, res) => {
  if (req.session.username) {
    res.json({ username: req.session.username, role: req.session.role });
  } else {
    res.json({ username: null, role:null });
  }
});

app.listen(process.env.PORT, "0.0.0.0", ()=>{
    console.log("running...");
})
