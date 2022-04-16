import app from '..';
import mongoose from 'mongoose';

const { DB_HOST, PORT = 3000 } = process.env;

if (!DB_HOST) {
  throw new Error(`Please set data base gate to connect`);
}

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(`Connect to MongoDb is success`);
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.log(error.message);
    process.exit(1);
  });
