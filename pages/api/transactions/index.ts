import useCors from '../../../middlewares/useCors';
import withAuth from '../../../middlewares/withAuth';
import Transaction from '../../../models/transaction';
import Database from '../../../services/mongodb';

export default withAuth(async (req, res, user) : Promise<void> => {
  useCors(req, res);

  await Database.connect();

  try {
    const transactions = await Transaction.find({
      owner: user.id
    });

    res.json(transactions);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
