import { model } from 'mongoose';

function modelExists (name: string) : boolean {
  try {
    model(name);
    return true;
  } catch (error) {
    return false;
  }
}

export default modelExists;
