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
const userModel=require('./models/user');
const BookingModel=require('./models/booking')
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

app.get('/user/:username', async (req, res) => {
  try {
      const user = await userModel.find();
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



app.post('/goal', async (req, res) => {
  const { goal, date,status } = req.body;
  try {
      const newGoal = new goalModel({ goal, date,status });
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
      const newFeedback = new feedbackModel({type, content });
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



app.get('/questions/:category', async (req, res) => {
  try {
      const { category } = req.params;
      const questions = await quizModel.find({ category });
      res.json(questions);
  } catch (err) {
      console.error('Error fetching questions by category:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/categories', async (req, res) => {
  try {
      const categories = await quizModel.distinct('category');
      res.json(categories);
  } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});





app.get('/mentors', async (req, res) => {
  try {
      const books = await mentorModel.find();
      res.json(books);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});




app.post('/bookings', async (req, res) => {
  try {
    const { mentorName, time, duration, meetingType, location, date ,status} = req.body;
    const newBooking = new BookingModel({ mentorName, time, duration, meetingType, location, date,status });
    await newBooking.save();
    res.status(200).json({ message: 'Booking confirmed!', booking: newBooking });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'An error occurred while booking. Please try again.' });
  }
});


app.get('/bookings', async (req, res) => {
  try {
      const booking = await BookingModel.find();
      res.json(booking);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
// Assuming 'goals' is a router configured in your Express app
app.put('/goal/:id', async (req, res) => {
  // Update the status of the goal with the given ID
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Assuming 'Goal' is your Mongoose model
    const updatedGoal = await goalModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json(updatedGoal);
  } catch (error) {
    console.error('Error updating goal status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/bookings/:id', async (req, res) => {
  // Update the status of the meeting with the given ID
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Assuming 'Meeting' is your Mongoose model
    const updatedMeeting = await BookingModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.status(200).json(updatedMeeting);
  } catch (error) {
    console.error('Error updating meeting status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});













app.listen(3001, () => {
  console.log("server is runingggg!");
});
