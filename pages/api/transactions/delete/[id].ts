import useCors from '../../../../middlewares/useCors';
import withAuth from '../../../../middlewares/withAuth';
import Transaction from '../../../../models/transaction';
import Database from '../../../../services/mongodb';

export default withAuth(async (req, res, user) : Promise<void> => {
  useCors(req, res);

  await Database.connect();

  try {
    const query = {
      _id: req.query.id,
      owner: user.id
    };

    if (user.role === 'admin') {
      delete query.owner;
    }

    const deleted = await Transaction.findByIdAndDelete(query);

    if (deleted) {
      res.status(204).end();
      return;
    } 

    throw new Error('Could not delete transaction');
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
