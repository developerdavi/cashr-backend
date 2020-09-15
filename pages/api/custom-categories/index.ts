import useCors from '../../../middlewares/useCors';
import withAuth from '../../../middlewares/withAuth';
import CustomCategory from '../../../models/customCategory';
import Database from '../../../services/mongodb';

export default withAuth(async (req, res, user) : Promise<void> => {
  useCors(req, res);

  await Database.connect();

  try {
    const categories = await CustomCategory.find({
      owner: user.id
    });

    res.json(categories);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
