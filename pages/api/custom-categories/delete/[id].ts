import useCors from '../../../../middlewares/useCors';
import withAuth from '../../../../middlewares/withAuth';
import CustomCategory from '../../../../models/customCategory';
import Database from '../../../../services/mongodb';

export default withAuth(async (req, res, user) : Promise<void> => {
  useCors(req, res);

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await Database.connect();

  try {
    const query = {
      _id: req.query._id,
      owner: user.id
    };

    if (user.role === 'admin') {
      delete query.owner;
    }

    const deleted = await CustomCategory.findByIdAndDelete(query);

    if (deleted) {
      res.status(204).end();
      return;
    } 

    throw new Error('Could not delete custom category');
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
