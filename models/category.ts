import { Schema, model, Document, Model } from 'mongoose';
import modelExists from '../helpers/modelExists';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

export interface ICategory extends Document {
  name: string;
}

const Category: Model<ICategory> = modelExists('categories') ? model('categories') : model('categories', schema);

export default Category;
