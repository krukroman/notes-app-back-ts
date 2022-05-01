import Note, { noteValidationJoi, archivedValidationJoi } from '../models/note';
import { BadRequest } from 'http-errors';
import parseDateFromText from '../utils/parseDateFromText';

class NotesServices {
  async getAll() {
    try {
      const data = await Note.findAll();
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createNote(credentials: Note) {
    try {
      const { error } = noteValidationJoi.validate(credentials);
      if (error) {
        throw new BadRequest(error.message);
      }
      const dates = parseDateFromText(credentials.content);
      const data = await Note.create({ ...credentials, dates });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

const notesServices = new NotesServices();

export default notesServices;
