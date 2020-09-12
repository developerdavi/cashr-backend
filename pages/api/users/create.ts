import { NowRequest, NowResponse } from '@vercel/node';
import User from '../../../models/user';
import Database from '../../../services/mongodb';

export default async (req: NowRequest, res: NowResponse) : Promise<void> => {
  await Database.connect();

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
