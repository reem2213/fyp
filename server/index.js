const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bookModel = require("./models/book");
const feedbackModel = require("./models/feedback");
const postModel = require("./models/post");
const goalModel = require("./models/goal");
const meetingModel = require("./models/meeting");
const mentorModel = require("./models/mentor");
const profileModel = require("./models/profile");
const productModel = require("./models/product");
const songModel = require("./models/song");
const gamificationModel = require("./models/gamification");
const quizModel = require("./models/quiz");
const quizCategoryModel = require("./models/quizCategory");
const responseModel = require("./models/userResponse");
const userModel = require('./models/user');
const formDataModel = require("./models/formData");  

const app = express();
app.use(express.json());
app.use(cors());

const connectionString = "mongodb+srv://reemdeeb00:MdEWisOAb2UKPU0Q@cluster0.d7rojza.mongodb.net/finalYearProject?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString, {
  useUnifiedTopology: true, useNewUrlParser: true
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.post("/SignUp", async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = await userModel.create(req.body);
    return res.json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/SignIn", (req, res) => {
  const { username, password } = req.body;
  userModel.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Successss");
      } else {
        res.json("incorrect passs");
      }
    } else {
      res.json("record not exist!!");
    }
  });
});

app.post('/goal', async (req, res) => {
  const { goal, date } = req.body;
  try {
      const newGoal = new goalModel({ goal, date });
      await newGoal.save();
      res.status(201).json(newGoal);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/goal', async (req, res) => {
  try {
      const goals = await goalModel.find();
      res.json(goals);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.delete('/goal/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const deletedGoal = await goalModel.findByIdAndDelete(id);
      if (!deletedGoal) {
          return res.status(404).json({ message: "Goal not found" });
      }
      res.json({ message: "Goal deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/feedback', async (req, res) => {
  const { type, content } = req.body;
  try {
      const newFeedback = new feedbackModel({ type, content });
      await newFeedback.save();
      res.status(201).json(newFeedback);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/feedback', async (req, res) => {
  try {
      const feedbacks = await feedbackModel.find();
      res.json(feedbacks);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.put('/feedback/:id', async (req, res) => {
  try {
    const { rating } = req.body;
    const feedback = await feedbackModel.findByIdAndUpdate(req.params.id, { rating }, { new: true });
    if (!feedback) {
      return res.status(404).send('Feedback not found');
    }
    res.send(feedback);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/books', async (req, res) => {
  try {
      const books = await bookModel.find();
      res.json(books);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/formData', async (req, res) => {
  try {
    const formData = new formDataModel(req.body);
    await formData.save();
    res.status(201).json(formData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/formData', async (req, res) => {
  try {
    const formData = await formDataModel.find();
    res.json(formData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3001, () => {
  console.log("server is runningggg!");
});
