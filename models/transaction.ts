import { Schema, model, SchemaTypes, Model, Document } from 'mongoose';
import modelExists from '../helpers/modelExists';

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  type: {
    type: String,
    enum: [
      'income',
      'outcome'
    ],
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  owner: {
    type: SchemaTypes.ObjectId,
    required: true
  }
}, {
  timestamps: true
});

export interface Itransaction extends Document {
  name: string;
  category: string;
  type: string;
  value: number;
  owner: string;
}

const Transaction: Model<Itransaction> = modelExists('transactions') ? model('transactions') : model('transactions', schema);

export default Transaction;
