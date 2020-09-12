import mongoose from 'mongoose';

let isDbCached: boolean = null;

async function connect() : Promise<void> {
  if (isDbCached) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  isDbCached = true;
}

const Database = {
  connect
};

export default Database;
