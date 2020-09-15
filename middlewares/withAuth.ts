import { NowApiHandler, NowRequest, NowResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import Database from '../services/mongodb';

type Options = {
  admin: boolean
}

type Handler = (req: NowRequest, res: NowResponse, user: IUser) => void | Promise<void>;

export default function withAuth(handler: Handler, options?: Options): NowApiHandler {
  return async (req: NowRequest, res: NowResponse) => {
    try {
      if (!req.headers['authorization']) {
        return res.status(401).json({
          error: 'You should be authenticated'
        });
      }

      const token = req.headers['authorization'].replace('Bearer', '').trim();

      let data : IUser;

      try {
        data = jwt.verify(token, process.env.JWT_KEY);
      } catch (error) {
        return res.status(400).json({
          error: 'Invalid authorization token'
        });
      }

      await Database.connect();
  
      const user = await User.findOne({ _id: data._id, 'tokens.token': token });
  
      if (!user) {
        return res.status(400).json({
          error: 'User not found'
        });
      }
  
      if (options && options.admin === true && user.role !== 'admin') {
        return res.status(403).json({
          error: 'You shouldn\'t be here'
        });
      }

      return handler(req, res, user);
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  };
}
