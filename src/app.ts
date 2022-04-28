import { Request, Response } from 'express';
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const errorHandler = require('./helpers/errorHandler');
const notesRouter = require('./routes/api/notes');
require('dotenv').config();

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

module.exports = app;
