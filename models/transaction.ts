import { Schema, model, SchemaTypes } from 'mongoose';
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
      'incoming',
      'outgoing'
    ],
    required: true
  },
  value: {
    type: Boolean,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

const Transaction = modelExists('categories') ? model('transactions') : model('transactions', schema);

export default Transaction;
