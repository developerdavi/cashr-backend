import useCors from '../../../middlewares/useCors';
import withAuth from '../../../middlewares/withAuth';
import Category from '../../../models/category';
import Database from '../../../services/mongodb';

export default withAuth(async (req, res): Promise<void> => {
  useCors(req, res);

  await Database.connect();

  try {
    const category = await Category.findById(req.body._id);

    category.name = req.body.name;
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}, {
  admin: true
});
