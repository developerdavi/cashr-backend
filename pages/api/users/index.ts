import { NowRequest, NowResponse } from '@vercel/node';
import withAuth from '../../../middlewares/withAuth';
import User from '../../../models/user';
import Database from '../../../services/mongodb';

const handler = async (req: NowRequest, res: NowResponse) : Promise<void> => {
  await Database.connect();

  try {
    const users = await User.find(req.query);

    res.json(users);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

export default withAuth(handler, {
  admin: true
});
