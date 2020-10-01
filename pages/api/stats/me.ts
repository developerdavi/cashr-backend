import useCors from '../../../middlewares/useCors';
import withAuth from '../../../middlewares/withAuth';
import Transaction from '../../../models/transaction';
import Database from '../../../services/mongodb';

export default withAuth(async (req, res, user) : Promise<void> => {
  useCors(req, res);

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await Database.connect();

  try {
    const transactions = await Transaction.find({
      owner: user.id
    });

    const result = {
      outcomes: transactions.filter(x => x.type === 'outcome').reduce((prev, curr) => {
        return curr.value + prev;
      }, 0),
      incomes: transactions.filter(x => x.type === 'income').reduce((prev, curr) => {
        return curr.value + prev;
      }, 0)
    };

    res.json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
