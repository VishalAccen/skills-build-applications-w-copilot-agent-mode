import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex-runner', email: 'alex@example.com', displayName: 'Alex Runner', fitnessLevel: 'intermediate' },
      { username: 'jamie-strong', email: 'jamie@example.com', displayName: 'Jamie Strong', fitnessLevel: 'beginner' },
    ]);

    await Team.create({
      name: 'Mergington Movers',
      description: 'A friendly team for building consistent habits.',
      members: users.map((user: { _id: mongoose.Types.ObjectId }) => user._id),
    });

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceKm: 5, notes: 'After-school run' },
      { user: users[1]._id, type: 'strength', durationMinutes: 25, notes: 'Full-body circuit' },
    ]);

    await Workout.create([
      {
        title: 'Starter Strength Circuit',
        description: 'A simple full-body circuit for building confidence.',
        fitnessLevel: 'beginner',
        durationMinutes: 20,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Plank'],
      },
      {
        title: 'Steady 5K Builder',
        description: 'An endurance session with a comfortable, sustainable pace.',
        fitnessLevel: 'intermediate',
        durationMinutes: 35,
        exercises: ['Warm-up walk', 'Steady run', 'Cool-down stretch'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
