import { NowRequest, NowResponse } from '@vercel/node';
import useCors from '../../../middlewares/useCors';
import withAuth from '../../../middlewares/withAuth';
import Category from '../../../models/category';
import Database from '../../../services/mongodb';

export default withAuth(async (req: NowRequest, res: NowResponse) : Promise<void> => {
  useCors(req, res);

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await Database.connect();

  try {
    const category = await Category.create({
      name: req.body.name
    });

    res.json(category);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}, {
  admin: true
});
