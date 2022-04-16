import { Request, Response, NextFunction } from 'express';
import { NotFound } from 'http-errors';
import { Note } from '../../models/note';

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  const { id: _id } = req.params;
  try {
    const note = await Note.findByIdAndDelete({ _id });
    if (!note) {
      throw new NotFound(`Note with id: ${_id} does not exist`);
    }
    res.json({
      message: 'Note deleted successfully',
      note: note
    });
  } catch (error) {
    next(error);
  }
};

export default deleteById;
