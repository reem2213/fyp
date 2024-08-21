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
const physicalAttributeModel= require('./models/physicalAtt')
const predictionModel=require('./models/prediction')
const app = express();
app.use(express.json());
app.use(cors());
 

const connectionString = "mongodb+srv://reemdeeb00:MdEWisOAb2UKPU0Q@cluster0.d7rojza.mongodb.net/finalYearProject?retryWrites=true&w=majority&appName=Cluster0";
//const connectionString = "mongodb+srv://reemdeeb00:MdEWisOAb2UKPU0Q@cluster0.d7rojza.mongodb.net/finalYearProject?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString, {
  useUnifiedTopology: true, useNewUrlParser: true
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});




app.post('/SignUp', async (req, res) => {
  const { username, email, password, gender, dateOfBirth, phoneNo, bio, image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Image is required' });
  }

  try {
    const user = new userModel({
      username,
      email,
      password,
      gender,
      dateOfBirth,
      phoneNo,
      bio,
      image,
    });

    await user.save();

    res.status(200).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
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

app.post('/goal/:username', async (req, res) => {
  const { username } = req.params;
  const { goal, date, status } = req.body;
  try {
      const newGoal = new goalModel({ username, goal, date, status });
      await newGoal.save();
      res.status(201).json(newGoal);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/goal/:username', async (req, res) => {
  const { username } = req.params;
  try {
      const goals = await goalModel.find({ username });
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



//FETCH MENTORS:

app.get('/mentors', async (req, res) => {
  const { section } = req.query; // Get the section from query parameters

  try {
    let mentors;
    if (section) {
      mentors = await mentorModel.find({ section }); // Filter mentors by section
    } else {
      mentors = await mentorModel.find(); // Get all mentors if no section is specified
    }
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//BOOKING
app.post('/bookings/:username', async (req, res) => {
  
  try {
    const { mentorName, time, duration, meetingType, location, date, status, username } = req.body;
    const newBooking = new BookingModel({ mentorName, time, duration, meetingType, location, date, status, username });
    await newBooking.save();
    res.status(200).json({ message: 'Booking confirmed!', booking: newBooking });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'An error occurred while booking. Please try again.' });
  }
});

app.get('/bookings/:username', async (req, res) => {
  const { username } = req.params;
  try {
      const bookings = await BookingModel.find({ username });
      res.json(bookings);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.put('/goal/:id', async (req, res) => {
  // Update the status of the goal with the given ID
  const { id } = req.params;
  const { status } = req.body;

  try {
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













const PostSchema = new mongoose.Schema({
  text: String,
  date: String,
  likes: { type: Number, default: 0 },
  reposts: { type: Number, default: 0 },
  image:String,
  repostedBy: { type: [String], default: [] },
  likedBy: { type: [String], default: [] } // New field to store usernames of users who liked

});

const Post = mongoose.model('Post', PostSchema);

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});


app.post('/posts', async (req, res) => {
  const { text, date, image } = req.body;

  const newPost = new Post({
    text,
    date,
    image,
  });

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
});


app.post('/posts/:id/toggle-like', async (req, res) => {
  const { username } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post.likedBy.includes(username)) {
    post.likes += 1;
    post.likedBy.push(username);
  } else {
    post.likes -= 1;
    post.likedBy = post.likedBy.filter(user => user !== username);
  }

  await post.save();
  res.json(post);
});
app.post('/posts/:id/toggle-repost', async (req, res) => {
  const { username } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post.repostedBy.includes(username)) {
    post.reposts += 1;
    post.repostedBy.push(username);
  } else {
    post.reposts -= 1;
    post.repostedBy = post.repostedBy.filter(user => user !== username);
  }

  await post.save();
  res.json(post);
});






//GAMIFICATION


app.post('/save-score', async (req, res) => {
  const { username, score, points } = req.body;

  const newUser = new responseModel({
      username,
      score,
      points
  });

  try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

app.get('/scores/:username', async (req, res) => {
  const { username } = req.params;
  try {
      const scores = await responseModel.find({ username }).sort({ date: -1 });
      res.status(200).json(scores);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});





//POINTS IN PROFILE

app.get('/user-points/:username', async (req, res) => {
  try {
    const { username } = req.params;
    console.log(`Fetching points for username: ${username}`);  // Log the request

    const totalPoints = await responseModel.aggregate([
      { $match: { username: username } },
      { $group: { _id: '$username', totalPoints: { $sum: '$points' } } }
    ]);

    console.log(`Aggregation result: ${JSON.stringify(totalPoints)}`);  // Log the aggregation result

    if (totalPoints.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }


    res.json({ username: username, totalPoints: totalPoints[0].totalPoints });
  } catch (error) {
    console.error('Aggregation error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});






//COMMUNITY
const MemberSchema = new mongoose.Schema({
  username: String,
});

const GroupSchema = new mongoose.Schema({
  name: String,
  description: String,
  members: [
    {
      username: String,
      joined: { type: Boolean, default: false },
    }
  ],
  messages: [
    {
      sender: String,
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  section: String


});
const Member = mongoose.model('Member', MemberSchema);
const Group = mongoose.model('Group', GroupSchema);

app.post('/users', async (req, res) => {
  const user = new Member(req.body);
  await user.save();
  res.send(user);
});

app.post('/groups', async (req, res) => {
  const group = new Group(req.body);
  await group.save();
  res.send(group);
});

app.get('/groups', async (req, res) => {
  const { username, section } = req.query;
  const groups = await Group.find({ section });  // Filter groups by section
  const userGroups = groups.map(group => {
    const isMember = group.members.some(member => member.username === username && member.joined);
    return { ...group.toObject(), joined: isMember };
  });
  res.send(userGroups);
});


app.get('/groups/joined', async (req, res) => {
  const { username } = req.query;
  try {
    const joinedGroups = await Group.find({ 'members.username': username, 'members.joined': true });
    res.json(joinedGroups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch joined groups', error });
  }
});

const typingStatus = {}; // Store typing statuses for each group
app.post('/groups/:id/typing', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  typingStatus[id] = { message: `${username} is typing...`, username };
  res.sendStatus(200);
});

app.post('/groups/:id/stopTyping', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  if (typingStatus[id] && typingStatus[id].username === username) {
    delete typingStatus[id];
  }
  res.sendStatus(200);
});

app.get('/groups/:id/typingStatus', (req, res) => {
  const { id } = req.params;
  res.json({ typingStatus: typingStatus[id] || '' });
});

// app.post('/groups/:id/messages', async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.id);
//     if (!group) {
//       return res.status(404).send({ message: 'Group not found' });
//     }
//     group.messages.push(req.body);
//     await group.save();
//     res.send(group.messages);
//   } catch (error) {
//     res.status(500).send({ message: 'Failed to send message', error });
//   }
// });
// server.js (Node.js/Express example)



// app.post('/groups/:id/join', async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.id);
//     if (!group) {
//       return res.status(404).send({ message: 'Group not found' });
//     }
//     const { username } = req.body;
//     const memberIndex = group.members.findIndex(member => member.username === username);

//     if (memberIndex === -1) {
//       group.members.push({ username, joined: true });
//     } else {
//       group.members[memberIndex].joined = true;
//     }

//     await group.save();
//     res.send(group);
//   } catch (error) {
//     res.status(500).send({ message: 'Failed to join group', error });
//   }

// });
app.post('/groups/:id/join', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).send({ message: 'Group not found' });
    }

    const username = req.body.username;
    const memberExists = group.members.some(member => member.username === username);

    if (memberExists) {
      return res.status(400).send({ message: 'User already a member of the group' });
    }

    group.members.push({ username });
    await group.save();

    // Send welcome message after joining
    const welcomeMessage = {
      sender: "system", // or another identifier for system messages
      text: `Heyy ${username}, welcome to our community! Here you will find yourself better, so how can we help you?`,
      timestamp: new Date(),
    };
    group.messages.push(welcomeMessage);
    await group.save();

    res.send(group);
  } catch (error) {
    console.error("Error joining group:", error); // Log the error
    res.status(500).send({ message: 'Failed to join group', error: error.message });
  }
});

app.post('/groups/:id/messages', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).send({ message: 'Group not found' });
    }
    group.messages.push(req.body);
    await group.save();
    res.send(group.messages);
  } catch (error) {
    console.error("Error sending message:", error); // Log the error
    res.status(500).send({ message: 'Failed to send message', error: error.message });
  }
});

app.get('/groups/:id/messages', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).send({ message: 'Group not found' });
    }
    res.send(group.messages);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch messages', error });
  }
});







// app.post('/groups/:id/messages', async (req, res) => {
//   const group = await Group.findById(req.params.id);
//   group.messages.push(req.body);
//   await group.save();
//   res.send(group);
// });



// // Get messages of a specific group
// app.get('/groups/:id/messages', async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.id);
//     if (!group) {
//       return res.status(404).send({ message: 'Group not found' });
//     }
//     res.send(group.messages);
//   } catch (error) {
//     res.status(500).send({ message: 'Failed to fetch messages', error });
//   }
// });
// const typingStatus = {}; // Store typing statuses for each group

// app.post('/groups/:id/typing', (req, res) => {
//   const { id } = req.params;
//   const { username } = req.body;
//   typingStatus[id] = { message: `${username} is typing...`, username };
//   res.sendStatus(200);
// });

// app.post('/groups/:id/stopTyping', (req, res) => {
//   const { id } = req.params;
//   const { username } = req.body;
//   if (typingStatus[id] && typingStatus[id].username === username) {
//     delete typingStatus[id];
//   }
//   res.sendStatus(200);
// });

// app.get('/groups/:id/typingStatus', (req, res) => {
//   const { id } = req.params;
//   res.json({ typingStatus: typingStatus[id] || '' });
// });










//navigatioon of user
app.get('/userr/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userModel.findOne({ username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});




//store image

app.post('/upload', async (req, res) => {
  const { username, image } = req.body;

  try {
    const user = await userModel.findOneAndUpdate(
      { username },
      { image },
      { new: true, upsert: true } // Update if exists, insert if not
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});







//edit user info

app.put('/user/:username', async (req, res) => {
  const { username } = req.params;
  const updateData = req.body;

  try {
    const user = await userModel.findOneAndUpdate({ username }, updateData, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});





//PHYSICAL SECTION

app.post('/formData/:username', async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const formData = new physicalAttributeModel({ ...req.body, userId: user._id });
    await formData.save();
    res.status(201).json(formData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Fetch physical attributes for a specific user based on username
app.get('/formData/:username', async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const formData = await physicalAttributeModel.findOne({ userId: user._id });
    if (!formData) return res.status(404).json({ message: 'Physical attributes not found' });

    res.json(formData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//SUPLEMENT SHOP

app.get('/products', async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
});






//GENERATE PROGRAM:
app.post('/savePrediction', async (req, res) => {
  const { username, prediction } = req.body;

  if (!username || !prediction) {
    return res.status(400).json({ error: 'Username and prediction are required' });
  }

  try {
    const newPrediction = new predictionModel({ username, prediction });
    await newPrediction.save();
    res.status(201).json({ message: 'Prediction saved successfully' });
  } catch (error) {
    console.error('Error saving prediction:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



app.get('/getPrediction/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const prediction = await predictionModel.findOne({ username }).sort({ createdAt: -1 }); // Fetch the latest prediction for the user
    if (!prediction) {
      return res.status(404).json({ error: 'Prediction not found' });
    }
    res.json({ prediction: prediction.prediction });
  } catch (error) {
    console.error('Error fetching prediction:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



app.listen(3001, () => {
  console.log("server is runingggg!");
});

