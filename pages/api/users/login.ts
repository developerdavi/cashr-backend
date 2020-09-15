import { NowRequest, NowResponse } from '@vercel/node';
import * as Yup from 'yup';
import useCors from '../../../middlewares/useCors';
import User from '../../../models/user';
import Database from '../../../services/mongodb';

type body = {
  email: string,
  password: string
}

const userSchema = Yup.object().shape({
  _id: Yup.string(),
  email: Yup.string(),
  name: Yup.string(),
  createdAt: Yup.string(),
  updatedAt: Yup.string()
});

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  useCors(req, res);

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  const { email, password }: body = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: 'Email and password fields are required'
    });

    return;
  }

  await Database.connect();

  try {
    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    res.json({ user: userSchema.cast(user, { stripUnknown: true }), token });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
