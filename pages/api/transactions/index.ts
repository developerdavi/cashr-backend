import { NowRequest, NowResponse } from '@vercel/node';
import Transaction from '../../../models/transaction';
import Database from '../../../services/mongodb';

export default async (req: NowRequest, res: NowResponse) : Promise<void> => {
  await Database.connect();

  try {
    const transactions = await Transaction.find(req.query);

    res.json(transactions);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
