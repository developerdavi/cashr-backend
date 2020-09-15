import { Schema, model, SchemaTypes, Model, Document } from 'mongoose';
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

export interface ICustomCategory extends Document {
  name: string;
  owner: string;
}

const CustomCategory: Model<ICustomCategory> = modelExists('custom_categories') ? model('custom_categories') : model('custom_categories', schema);

export default CustomCategory;
