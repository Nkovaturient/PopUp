const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Challenge = require('../models/Challenge');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  connectTimeoutMS: 30000,
  serverSelectionTimeoutMS: 30000,
})
.then(() => console.log('MongoDB connected for data population'))
.catch(err => console.error('MongoDB connection error:', err));

// Demo user data
const createUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create hashed passwords
    const salt = await bcrypt.genSalt(10);
    const password1 = await bcrypt.hash('alice123', salt);
    const password2 = await bcrypt.hash('bob123', salt);
    const password3 = await bcrypt.hash('charlie123', salt);
    const password4 = await bcrypt.hash('diana123', salt);
    const password5 = await bcrypt.hash('edward123', salt);

    const users = [
      { 
        username: 'Alice', 
        password: password1, 
        email: 'alice@example.com', 
        score: 150, 
        tokens: 50,
        completedChallenges: []
      },
      { 
        username: 'Bob', 
        password: password2, 
        email: 'bob@example.com', 
        score: 120, 
        tokens: 40,
        completedChallenges: []
      },
      { 
        username: 'Charlie', 
        password: password3, 
        email: 'charlie@example.com', 
        score: 200, 
        tokens: 65,
        completedChallenges: []
      },
      { 
        username: 'Diana', 
        password: password4, 
        email: 'diana@example.com', 
        score: 85, 
        tokens: 25,
        completedChallenges: []
      },
      { 
        username: 'Edward', 
        password: password5, 
        email: 'edward@example.com', 
        score: 175, 
        tokens: 55,
        completedChallenges: []
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);
    return createdUsers;
  } catch (error) {
    console.error('Error creating users:', error);
    throw error;
  }
};

// Demo challenge data
const createChallenges = async (users) => {
  try {
    // Clear existing challenges
    await Challenge.deleteMany({});
    console.log('Cleared existing challenges');

    const challenges = [
      {
        title: "Game of Thrones Economics",
        description: "Learn about economic principles through the lens of Game of Thrones. Explore concepts like resource scarcity, power dynamics, and trade relationships between the Seven Kingdoms.",
        theme: "Fantasy",
        reward: "100 Tokens",
        creator: users[0]._id
      },
      {
        title: "NBA Statistics Deep Dive",
        description: "Understand statistical analysis through NBA data. Learn about averages, percentiles, standard deviations, and correlation by analyzing player performance metrics.",
        theme: "Sports",
        reward: "80 Tokens",
        creator: users[1]._id
      },
      {
        title: "Marvel Universe Physics",
        description: "Explore physics concepts through Marvel superhero abilities. Learn about energy conservation, momentum, gravity, and quantum mechanics through entertaining examples.",
        theme: "Superheroes",
        reward: "120 Tokens",
        creator: users[2]._id
      },
      {
        title: "Star Wars Political Systems",
        description: "Study political science concepts through Star Wars governance models. Compare the Republic, Empire, and Rebellion to understand democracy, authoritarianism, and revolution.",
        theme: "Sci-Fi",
        reward: "90 Tokens",
        creator: users[0]._id
      },
      {
        title: "Harry Potter Chemistry",
        description: "Learn chemistry principles through potions and spells in the Harry Potter universe. Understand chemical reactions, compounds, and transformations through magical examples.",
        theme: "Fantasy",
        reward: "85 Tokens",
        creator: users[3]._id
      },
      {
        title: "Minecraft Engineering Principles",
        description: "Explore engineering and architecture concepts through Minecraft building techniques. Learn about structural integrity, resource management, and design efficiency.",
        theme: "Gaming",
        reward: "70 Tokens",
        creator: users[4]._id
      },
      {
        title: "Breaking Bad Chemistry",
        description: "Dive into organic chemistry concepts through Breaking Bad scenarios. Study chemical compounds, reactions, and laboratory techniques (for educational purposes only!).",
        theme: "TV Shows",
        reward: "95 Tokens",
        creator: users[2]._id
      },
      {
        title: "Pokémon Biology",
        description: "Learn biology concepts through Pokémon evolution and types. Explore genetics, adaptation, ecosystems, and classification using the diverse Pokémon world.",
        theme: "Gaming",
        reward: "75 Tokens",
        creator: users[1]._id
      }
    ];

    const createdChallenges = await Challenge.insertMany(challenges);
    console.log(`${createdChallenges.length} challenges created`);
    return createdChallenges;
  } catch (error) {
    console.error('Error creating challenges:', error);
    throw error;
  }
};

// Update users with completed challenges
const assignCompletedChallenges = async (users, challenges) => {
  try {
    // Alice completed 3 challenges
    await User.findByIdAndUpdate(users[0]._id, {
      $set: { completedChallenges: [challenges[1]._id, challenges[4]._id, challenges[6]._id] }
    });

    // Bob completed 2 challenges
    await User.findByIdAndUpdate(users[1]._id, {
      $set: { completedChallenges: [challenges[0]._id, challenges[2]._id] }
    });

    // Charlie completed 4 challenges
    await User.findByIdAndUpdate(users[2]._id, {
      $set: { completedChallenges: [challenges[0]._id, challenges[3]._id, challenges[5]._id, challenges[7]._id] }
    });

    // Diana completed 1 challenge
    await User.findByIdAndUpdate(users[3]._id, {
      $set: { completedChallenges: [challenges[6]._id] }
    });

    // Edward completed 3 challenges
    await User.findByIdAndUpdate(users[4]._id, {
      $set: { completedChallenges: [challenges[1]._id, challenges[3]._id, challenges[7]._id] }
    });

    console.log('Updated users with completed challenges');
  } catch (error) {
    console.error('Error assigning completed challenges:', error);
    throw error;
  }
};

// Run the population script
const populateDatabase = async () => {
  try {
    const users = await createUsers();
    const challenges = await createChallenges(users);
    await assignCompletedChallenges(users, challenges);
    
    console.log('Database successfully populated with demo data!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Database population failed:', error);
    mongoose.connection.close();
  }
};

populateDatabase();