import useCors from '../../../middlewares/useCors';
import withAuth from '../../../middlewares/withAuth';
import Transaction from '../../../models/transaction';
import Database from '../../../services/mongodb';

export default withAuth(async (req, res, user) : Promise<void> => {
  useCors(req, res);

  await Database.connect();

  try {
    const transaction = await Transaction.create({
      name: req.body.name,
      category: req.body.category,
      type: req.body.type,
      value: req.body.value,
      owner: user.id
    });

    res.json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
