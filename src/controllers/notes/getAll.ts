import { Response, Request, NextFunction } from 'express';
import { Note } from '../../models/note';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find({}, '--updatedAt');
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

export default getAll;
