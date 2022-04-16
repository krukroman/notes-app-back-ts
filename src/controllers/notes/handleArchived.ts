import { Request, Response, NextFunction } from 'express';
import { BadRequest, NotFound } from 'http-errors';
import { Note, archiveValidationJoi } from '../../models/note';

const handleArchive = async (req: Request, res: Response, next: NextFunction) => {
  const { body, params } = req;
  const _id = params.id;
  try {
    const { error } = archiveValidationJoi.validate(body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const updatedNote = await Note.findByIdAndUpdate(
      { _id },
      { archived: body.archived },
      { new: true }
    );

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

export default handleArchive;
