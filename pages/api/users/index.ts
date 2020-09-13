import { NowRequest, NowResponse } from '@vercel/node';
import useCors from '../../../helpers/useCors';
import withAuth from '../../../middlewares/withAuth';
import User from '../../../models/user';
import Database from '../../../services/mongodb';

export default withAuth(async (req: NowRequest, res: NowResponse) : Promise<void> => {
  await Database.connect();

  useCors(req, res);

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
