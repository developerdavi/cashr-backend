import useCors from '../../../middlewares/useCors';
import withAuth from '../../../middlewares/withAuth';
import CustomCategory from '../../../models/customCategory';
import Database from '../../../services/mongodb';

export default withAuth(async (req, res, user): Promise<void> => {
  useCors(req, res);

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await Database.connect();

  try {
    const query = {
      _id: req.body._id,
      owner: user.id
    };

    if (user.role === 'admin') {
      delete query.owner;
    }

    const category = await CustomCategory.findOne(query);

    if (!category) {
      return res.status(404).end();
    }

    category.name = req.body.name;
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
