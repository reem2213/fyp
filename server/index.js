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



// app.post("/SignIn", (req, res) => {
//   const { username, password } = req.body;
//   userModel.findOne({ username: username }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         res.json("Successss");
//       } else {
//         res.json("incorrect passs");
//       }
//     } else {
//       res.json("record not exist!!");
//     }
//   });
// });
app.post("/SignIn", (req, res) => {
  const { username, password } = req.body;

  userModel.findOne({ username: username })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // Return the user ID along with the success message
          res.json({
            status: "Success",
            userId: user._id, // MongoDB document ID
            message: "Sign in successful"
          });
        } else {
          res.json({
            status: "Error",
            message: "Incorrect password"
          });
        }
      } else {
        res.json({
          status: "Error",
          message: "User does not exist"
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: "Error",
        message: "An error occurred during the sign-in process"
      });
    });
});


// app.get('/user/:username', async (req, res) => {
//   try {
//       const user = await userModel.find();
//       res.json(user);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// });
app.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
      const user = await userModel.findById(userId); // Use findById to get the user by userId
      if (user) {
          res.json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/goal/:userId', async (req, res) => {
  const { userId } = req.params;
  const { goal, date, status } = req.body;
  try {
      const newGoal = new goalModel({ userId, goal, date, status });
      await newGoal.save();
      res.status(201).json(newGoal);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/goal/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
      const goals = await goalModel.find({ userId });
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
app.post('/bookings/:userId', async (req, res) => {
  
  try {
    const { userId } = req.params;
    const { mentorName, time, duration, meetingType, location, date, status } = req.body;
    const newBooking = new BookingModel({ mentorName, time, duration, meetingType, location, date, status, userId });
    await newBooking.save();
    res.status(200).json({ message: 'Booking confirmed!', booking: newBooking });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'An error occurred while booking. Please try again.' });
  }
});

app.get('/bookings/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
      const bookings = await BookingModel.find({ userId });
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
  repostedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] }, // Store user IDs
  likedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] }

});

const Post = mongoose.model('Post', PostSchema);

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});
// the liked and rposted by should be fetched by userId if I sign in by a userId and enter to the post screen the post i have liked and reposted (the icons should be in red and green )


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


// app.post('/posts/:id/toggle-like', async (req, res) => {
//   const { username } = req.body;
//   const post = await Post.findById(req.params.id);

//   if (!post.likedBy.includes(username)) {
//     post.likes += 1;
//     post.likedBy.push(username);
//   } else {
//     post.likes -= 1;
//     post.likedBy = post.likedBy.filter(user => user !== username);
//   }

//   await post.save();
//   res.json(post);
// });
// app.post('/posts/:id/toggle-repost', async (req, res) => {
//   const { username } = req.body;
//   const post = await Post.findById(req.params.id);

//   if (!post.repostedBy.includes(username)) {
//     post.reposts += 1;
//     post.repostedBy.push(username);
//   } else {
//     post.reposts -= 1;
//     post.repostedBy = post.repostedBy.filter(user => user !== username);
//   }

//   await post.save();
//   res.json(post);
// });

app.post('/posts/:id/toggle-like', async (req, res) => {
  const { userId } = req.body;
  const post = await Post.findById(req.params.id);

  if (!Array.isArray(post.likedBy)) {
    post.likedBy = [];
  }

  if (!post.likedBy.includes(userId)) {
    post.likes += 1;
    post.likedBy.push(userId);
  } else {
    post.likes -= 1;
    post.likedBy = post.likedBy.filter(user => user.toString() !== userId);
  }

  await post.save();
  res.json(post);
});

app.post('/posts/:id/toggle-repost', async (req, res) => {
  const { userId } = req.body;
  const post = await Post.findById(req.params.id);

  if (!Array.isArray(post.repostedBy)) {
    post.repostedBy = [];
  }

  if (!post.repostedBy.includes(userId)) {
    post.reposts += 1;
    post.repostedBy.push(userId);

  } else {
    post.reposts -= 1;
    post.repostedBy = post.repostedBy.filter(user => user.toString() !== userId);
  }

  await post.save();
  res.json(post);
});








//GAMIFICATION


app.get('/get-userid', async (req, res) => {
  const { username } = req.query;

  try {
    const user = await userModel.findOne({ username });
    if (user) {
      res.status(200).json({ userId: user._id });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post('/save-score', async (req, res) => {
  const { userId, score, points } = req.body;

  const newUserResponse = new responseModel({
    userId,
    score,
    points,
  });

  try {
    const savedUserResponse = await newUserResponse.save();
    res.status(201).json(savedUserResponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.get('/scores/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
      const scores = await responseModel.find({ userId: userId }).sort({ date: -1 });
      res.status(200).json(scores);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});





//POINTS IN PROFILE

app.get('/user-points/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Fetching points for userId: ${userId}`);  // Log the request

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid user ID format');
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Correctly instantiate ObjectId with 'new'
    const totalPoints = await responseModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },  // Use 'new' keyword with ObjectId
      { $group: { _id: '$userId', totalPoints: { $sum: '$points' } } }
    ]);

    console.log(`Aggregation result: ${JSON.stringify(totalPoints)}`);  // Log the aggregation result

    if (totalPoints.length === 0) {
      console.log('User not found or no points available');
      return res.status(404).json({ message: 'User not found or no points available' });
    }

    res.json({ userId: userId, totalPoints: totalPoints[0].totalPoints });
  } catch (error) {
    console.error('Aggregation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
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
      userId: mongoose.Schema.Types.ObjectId,
      joined: { type: Boolean,default:true },
    }
  ],
  // messages: [
  //   {
  //     sender: mongoose.Schema.Types.ObjectId,
  //     text: String,
  //     timestamp: { type: Date, default: Date.now },
  //   },
  // ],
  messages: [
    {
        sender: {
            type: mongoose.Schema.Types.Mixed,  // Allows ObjectId or String
            required: true,
            validate: {
                validator: function(value) {
                    // Allow either an ObjectId or the string "system"
                    return mongoose.Types.ObjectId.isValid(value) || typeof value === 'string';
                },
                message: props => `${props.value} is not a valid sender!`
            }
        },
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
async function convertUsernamesToObjectIds() {
  const groups = await Group.find();
  for (const group of groups) {
    let updated = false;
    for (const message of group.messages) {
      if (typeof message.sender === 'string') {
        const user = await Member.findOne({ username: message.sender });
        if (user) {
          message.sender = user._id;
          updated = true;
        }
      }
    }
    if (updated) {
      await group.save();
    }
  }
  console.log('Conversion complete');
}

convertUsernamesToObjectIds();


app.get('/groups', async (req, res) => {
  const { userId, section } = req.query;
  const groups = await Group.find({ section });  // Filter groups by section
  const userGroups = groups.map(group => {
    const isMember = group.members.some(member => member.userId.equals(userId) && member.joined);
    return { ...group.toObject(), joined: isMember };
  });
  res.send(userGroups);
});

app.get('/groups/joined', async (req, res) => {
  const { userId } = req.query;
  try {
    const joinedGroups = await Group.find({ 'members.userId': userId, 'members.joined': true });
    res.json(joinedGroups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch joined groups', error });
  }
});


app.post('/groups/:id/join', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).send({ message: 'Group not found' });
    }

    const { userId } = req.body;

    const memberExists = group.members.some(member => member.userId.equals(userId));

    if (memberExists) {
      return res.status(400).send({ message: 'User already a member of the group' });
    }

    group.members.push({ userId: new mongoose.Types.ObjectId(userId) });
    await group.save();

    // Use a system user ObjectId or handle system messages with a specific identifier
    const systemUserId = new mongoose.Types.ObjectId("64a9f8a7f6c7d9bcbdd741e3"); // Example system user ID

    const welcomeMessage = {
      sender: systemUserId,  // Use the system user ID
      text: `Heyy, welcome to our community!`,
      timestamp: new Date(),
    };
    group.messages.push(welcomeMessage);
    await group.save();

    res.send(group);
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).send({ message: 'Failed to join group', error: error.message });
  }
});



app.post('/groups/:id/messages', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).send({ message: 'Group not found' });
    }

    const { sender, text } = req.body;
    console.log(`Received message from user: ${sender}`); // Add this line


    // Check if sender is a valid ObjectId
    let senderId;
    if (sender === 'system') {
      senderId = systemUserId;  // Use the system user ID or handle it as needed
    } else {
      senderId = new mongoose.Types.ObjectId(sender);
    }

    group.messages.push({
      sender: senderId,  // Convert to ObjectId
      text,
    });

    await group.save();
    res.send(group.messages);
    console.log('Message sender:', senderId);


  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send({ message: 'Failed to send message', error: error.message });
  }
});


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

const typingStatus = {}; // Store typing statuses for each group

app.post('/groups/:id/typing', (req, res) => {
  const { id } = req.params; // group ID
  const { userId, username } = req.body;

  // Store the typing status
  typingStatus[id] = { message: `${username} is typing...`, userId };
  
  res.sendStatus(200);
});

app.post('/groups/:id/stopTyping', (req, res) => {
  const { id } = req.params; // group ID
  const { userId } = req.body;

  // Clear the typing status only if the same user who started typing stops typing
  if (typingStatus[id] && typingStatus[id].userId === userId) {
    delete typingStatus[id];
  }

  res.sendStatus(200);
});

app.get('/groups/:id/typingStatus', (req, res) => {
  const { id } = req.params; // group ID
  const { userId } = req.query; // Current user's ID

  // Check if someone else is typing in the group
  if (typingStatus[id] && typingStatus[id].userId !== userId) {
    res.json({ typingStatus: typingStatus[id].message });
  } else {
    res.json({ typingStatus: '' });
  }
});

// app.post('/groups/:id/join', async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.id);
//     if (!group) {
//       return res.status(404).send({ message: 'Group not found' });
//     }

//     const username = req.body.username;
//     const memberExists = group.members.some(member => member.username === username);

//     if (memberExists) {
//       return res.status(400).send({ message: 'User already a member of the group' });
//     }

//     group.members.push({ username });
//     await group.save();

//     // Send welcome message after joining
//     const welcomeMessage = {
//       sender: "system", // or another identifier for system messages
//       text: `Heyy ${username}, welcome to our community! Here you will find yourself better, so how can we help you?`,
//       timestamp: new Date(),
//     };
//     group.messages.push(welcomeMessage);
//     await group.save();

//     res.send(group);
//   } catch (error) {
//     console.error("Error joining group:", error); // Log the error
//     res.status(500).send({ message: 'Failed to join group', error: error.message });
//   }
// });

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
//     console.error("Error sending message:", error); // Log the error
//     res.status(500).send({ message: 'Failed to send message', error: error.message });
//   }
// });

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
  const { userId, prediction } = req.body;

  if (!userId || !prediction) {
    return res.status(400).json({ error: 'User ID and prediction are required' });
  }

  try {
    const newPrediction = new predictionModel({ userId, prediction });
    await newPrediction.save();
    res.status(201).json({ message: 'Prediction saved successfully' });
  } catch (error) {
    console.error('Error saving prediction:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/getPrediction/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const prediction = await predictionModel.findOne({ userId }).sort({ createdAt: -1 }); // Fetch the latest prediction for the user
    if (!prediction) {
      return res.status(404).json({ error: 'Prediction not found' });
    }
    res.json({ prediction: prediction.prediction });
  } catch (error) {
    console.error('Error fetching prediction:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



//EDIT PROFILE:

app.put('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { newUsername, bio, email, image } = req.body;
    
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { username: newUsername, bio, email, image },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



app.listen(3001, () => {
  console.log("server is runingggg!");
});

