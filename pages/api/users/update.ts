import useCors from '../../../middlewares/useCors';
import withAuth from '../../../middlewares/withAuth';
import User from '../../../models/user';
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
      _id: user.role !== 'admin' ? user.id : req.body._id
    };

    const foundUser = await User.findOne(query);

    if (!foundUser) {
      return res.status(404).end();
    }

    foundUser.name = req.body.name;
    await foundUser.save();

    res.json(foundUser);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
