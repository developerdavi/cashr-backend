import { NowRequest, NowResponse } from '@vercel/node';
import useCors from '../../../helpers/useCors';
import Transaction from '../../../models/transaction';
import Database from '../../../services/mongodb';

export default async (req: NowRequest, res: NowResponse) : Promise<void> => {
  useCors(req, res);

  await Database.connect();

  try {
    const transaction = await Transaction.create({
      name: req.body.name,
      category: req.body.category,
      type: req.body.type,
      value: req.body.value
    });

    res.json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
