import app from '../app';
import { sequelize } from '../models/note';

const { PORT = 3000 } = process.env;

const serverStart = async () => {
  try {
    await sequelize.authenticate();
    console.log('db connection succeeded');
    app.listen(PORT, () => {
      console.log(`Server running on address: http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

serverStart();
