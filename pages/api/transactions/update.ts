import useCors from '../../../middlewares/useCors';
import withAuth from '../../../middlewares/withAuth';
import Transaction from '../../../models/transaction';
import Database from '../../../services/mongodb';

export default withAuth(async (req, res, user): Promise<void> => {
  useCors(req, res);

  await Database.connect();

  try {
    const query = {
      _id: req.body._id,
      owner: user.id
    };

    if (user.role === 'admin') {
      delete query.owner;
    }

    const transaction = await Transaction.findOne(query);

    if (!transaction) {
      return res.status(404).end();
    }

    transaction.name = req.body.name;
    transaction.value = req.body.value;
    transaction.type = req.body.type;
    transaction.category = req.body.category;
    await transaction.save();

    res.json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
