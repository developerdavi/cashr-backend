import { Schema, model, SchemaTypes } from 'mongoose';
import modelExists from '../helpers/modelExists';

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: SchemaTypes.ObjectId,
    required: true
  }
}, {
  timestamps: true
});

const CustomCategory = modelExists('custom_categories') ? model('custom_categories') : model('custom_categories', schema);

export default CustomCategory;
