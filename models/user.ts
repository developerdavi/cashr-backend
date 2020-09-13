import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
  },
  tokens: [{
    token: {
      type: String,
      required: true
    },
  }]
}, {
  timestamps: true
});

schema.statics.findByCredentials = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }

  return user;
};

schema.methods.generateAuthToken = async function() {
  const user = <IUser>this;

  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

  user.tokens.push({ token });

  await user.save();

  return token;
};

schema.pre('save', async function (next) {
  const user = <IUser>this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

interface IToken {
  token: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  tokens?: Array<IToken>;
  generateAuthToken(): Promise<string>;
}

export interface IUserModel extends Model<IUser> {
  findByCredentials?(email: string, password: string): Promise<IUser>;
}

const User: IUserModel = modelExists('users') ? model<IUser>('users') : model<IUser>('users', schema);

export default User;
