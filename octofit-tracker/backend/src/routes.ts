import { Router } from 'express';
import { Activity, Team, User, Workout } from './models/index.js';

const router = Router();

function requiredString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}

function positiveNumber(value: unknown, field: string): number {
  const number = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${field} must be a positive number`);
  }
  return number;
}

router.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ displayName: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (request, response, next) => {
  try {
    const user = await User.create({
      username: requiredString(request.body.username, 'username'),
      email: requiredString(request.body.email, 'email'),
      displayName: requiredString(request.body.displayName, 'displayName'),
      fitnessLevel: request.body.fitnessLevel,
    });
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'username displayName fitnessLevel'));
  } catch (error) {
    next(error);
  }
});

router.post('/teams', async (request, response, next) => {
  try {
    const members = Array.isArray(request.body.members) ? request.body.members : [];
    const team = await Team.create({
      name: requiredString(request.body.name, 'name'),
      description: request.body.description || '',
      members,
    });
    response.status(201).json(await team.populate('members', 'username displayName'));
  } catch (error) {
    next(error);
  }
});

router.get('/activities', async (request, response, next) => {
  try {
    const filter = request.query.user ? { user: request.query.user } : {};
    response.json(await Activity.find(filter).populate('user', 'username displayName').sort({ completedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/activities', async (request, response, next) => {
  try {
    const activity = await Activity.create({
      user: requiredString(request.body.user, 'user'),
      type: requiredString(request.body.type, 'type'),
      durationMinutes: positiveNumber(request.body.durationMinutes, 'durationMinutes'),
      distanceKm: request.body.distanceKm === undefined ? undefined : positiveNumber(request.body.distanceKm, 'distanceKm'),
      notes: request.body.notes || '',
      completedAt: request.body.completedAt,
    });
    response.status(201).json(await activity.populate('user', 'username displayName'));
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$user', points: { $sum: '$durationMinutes' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, userId: '$_id', username: '$user.username', displayName: '$user.displayName', points: 1, activities: 1 } },
    ]);
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.get('/workouts', async (request, response, next) => {
  try {
    const filter = request.query.level ? { fitnessLevel: request.query.level } : {};
    response.json(await Workout.find(filter).sort({ fitnessLevel: 1, title: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/workouts', async (request, response, next) => {
  try {
    const workout = await Workout.create({
      title: requiredString(request.body.title, 'title'),
      description: requiredString(request.body.description, 'description'),
      fitnessLevel: requiredString(request.body.fitnessLevel, 'fitnessLevel'),
      durationMinutes: positiveNumber(request.body.durationMinutes, 'durationMinutes'),
      exercises: Array.isArray(request.body.exercises) ? request.body.exercises : [],
    });
    response.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default router;