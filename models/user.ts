import { Schema, model, Document } from 'mongoose';
import modelExists from '../helpers/modelExists';

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
}, {
  timestamps: true
});

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const User = modelExists('users') ? model<IUser>('users') : model<IUser>('users', schema);

export default User;
