import { NowRequest, NowResponse } from '@vercel/node';
import * as Yup from 'yup';

import useCors from '../../../middlewares/useCors';
import User from '../../../models/user';
import Database from '../../../services/mongodb';

const userSchema = Yup.object().shape({
  email: Yup.string().required('Por favor, preencha o e-mail').email('E-mail inválido'),
  name: Yup.string().required('Por favor, preencha o nome'),
  password: Yup.string().required('Por favor, preencha a senha').min(8, 'Sua senha precisa de pelo menos 8 caracteres')
    .max(24, 'Sua senha pode ter no máximo 24 caracteres'),
});

export default async (req: NowRequest, res: NowResponse) : Promise<void> => {
  useCors(req, res);

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await Database.connect();

  try {
    userSchema.validateSync(req.body);

    const exists = await User.find({
      email: req.body.email
    });

    if (exists) {
      throw new Error('Já existe um usuário cadastrado com esse e-mail');
    }

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'user'
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
