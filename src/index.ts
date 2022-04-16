import express, { Request, Response } from 'express';
import cors from 'cors';
import logger from 'morgan';
import { config } from 'dotenv';
import errorHandler from './helpers/errorHandler';
import notesRouter from './routes/api/notes';
config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/notes', notesRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

export default app;
