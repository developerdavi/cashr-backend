import { NowRequest, NowResponse } from '@vercel/node';
import useCors from '../../../middlewares/useCors';
import User from '../../../models/user';
import Database from '../../../services/mongodb';
import withAuth from '../../../middlewares/withAuth';

export default withAuth(async (req: NowRequest, res: NowResponse) : Promise<void> => {
  useCors(req, res);

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await Database.connect();

  try {
    const users = await User.find(req.query, { tokens: false, __v: false, password: false });

    res.json(users);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}, {
  admin: true
});
