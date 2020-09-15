import useCors from '../../../middlewares/useCors';
import withAuth from '../../../middlewares/withAuth';
import CustomCategory from '../../../models/customCategory';
import Category from '../../../models/category';
import Database from '../../../services/mongodb';

export default withAuth(async (req, res, user) : Promise<void> => {
  useCors(req, res);

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await Database.connect();

  try {
    const exists = await CustomCategory.findOne({
      name: req.body.name.trim(),
      owner: user.id
    });

    if (exists) {
      throw new Error('A custom category with that name already exists');
    }

    const existsGlobal = await Category.findOne({
      name: req.body.name.trim()
    });

    if (existsGlobal) {
      throw new Error('A category with that name already exists');
    }

    const count = await CustomCategory.countDocuments({
      owner: user.id
    });

    if (count >= 30) {
      throw new Error('You have already created the maximum of custom categories');
    }

    const category = await CustomCategory.create({
      name: req.body.name.trim(),
      owner: user.id
    });

    res.json(category);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
