import { NowRequest, NowResponse } from '@vercel/node';
import useCors from '../../../middlewares/useCors';
import Category from '../../../models/category';
import Database from '../../../services/mongodb';

export default async (req: NowRequest, res: NowResponse) : Promise<void> => {
  useCors(req, res);

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await Database.connect();

  try {
    const categories = await Category.find(req.query);

    res.json(categories);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
