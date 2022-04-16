import { Request, Response, NextFunction } from 'express';
import { BadRequest } from 'http-errors';
import { Note, noteValidationJoi } from '../../models/note';
import parseDateFromText from '../../utils/parseDateFromText';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  console.log(body);

  try {
    const { error } = noteValidationJoi.validate(body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const dates = parseDateFromText(body.content);

    const newNote = await Note.create({ ...body, dates });
    res.status(201).json({
      _id: newNote._id,
      name: newNote.name,
      category: newNote.category,
      content: newNote.content,
      dates: newNote.dates,
      archived: newNote.archived,
      createdAt: newNote.createdAt
    });
  } catch (error) {
    next(error);
  }
};

export default create;
