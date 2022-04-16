import { Request, Response, NextFunction } from 'express';
import { BadRequest, NotFound } from 'http-errors';
import { Note, noteValidationJoi } from '../../models/note';
import parseDateFromText from '../../utils/parseDateFromText';

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  const { body, params } = req;
  const _id = params.id;
  try {
    const { error } = noteValidationJoi.validate(body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const dates = parseDateFromText(body.content);

    const updatedNote = await Note.findByIdAndUpdate({ _id }, { ...body, dates }, { new: true });

    if (!updatedNote) {
      throw new NotFound(`Note with id: ${_id} does not exist`);
    }
    res.json({
      _id: updatedNote._id,
      name: updatedNote.name,
      category: updatedNote.category,
      content: updatedNote.content,
      dates: updatedNote.dates,
      archived: updatedNote.archived,
      createdAt: updatedNote.createdAt
    });
  } catch (error) {
    next(error);
  }
};

export default updateById;
