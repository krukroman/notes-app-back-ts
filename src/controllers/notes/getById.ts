import { Request, Response, NextFunction } from 'express';
import { NotFound } from 'http-errors';
import { Note } from '../../models/note';

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id: _id } = req.params;
  try {
    const note = await Note.findById({ _id }, '--updatedAt');
    if (!note) {
      throw new NotFound(`Note with id: ${_id} does not exist`);
    }
    res.json(note);
  } catch (error) {
    next(error);
  }
};

export default getById;
