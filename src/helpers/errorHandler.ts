import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.message.includes('invalid input syntax')) {
    err.status = 400;
  }

  const { status = 500, message = 'Server error' } = err;

  res.status(status).json({ message });
};

export default errorHandler;
