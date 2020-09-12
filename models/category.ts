import { Schema, model } from 'mongoose';
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

const Category = modelExists('categories') ? model('categories') : model('categories', schema);

export default Category;
