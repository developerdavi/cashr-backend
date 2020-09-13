import { NowRequest, NowResponse } from '@vercel/node';
import useCors from '../../../../helpers/useCors';
import CustomCategory from '../../../../models/customCategory';
import Database from '../../../../services/mongodb';

export default async (req: NowRequest, res: NowResponse) : Promise<void> => {
  useCors(req, res);

  await Database.connect();

  try {
    const category = await CustomCategory.create({
      name: req.body.name
    });

    res.json(category);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
