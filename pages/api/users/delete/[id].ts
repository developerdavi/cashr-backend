import useCors from '../../../../middlewares/useCors';
import withAuth from '../../../../middlewares/withAuth';
import User from '../../../../models/user';
import Database from '../../../../services/mongodb';

export default withAuth(async (req, res) : Promise<void> => {
  useCors(req, res);

  await Database.connect();

  try {
    const deleted = await User.findByIdAndDelete({
      _id: req.query.id
    });

    if (deleted) {
      res.status(204).end();
      return;
    } 

    throw new Error('Could not delete user');
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}, {
  admin: true
});
