import Note, { noteValidationJoi, archivedValidationJoi } from '../models/note';
import { BadRequest, NotFound } from 'http-errors';
import parseDateFromText from '../utils/parseDateFromText';

class NotesServices {
  async getAll() {
    const notes = await Note.findAll();
    return notes;
  }

  async getById(id: string) {
    const note = await Note.findOne({ where: { id } });
    if (!note) {
      throw new NotFound(`Note width id: ${id} not found`);
    }
    return note;
  }

  async create(credentials: Note) {
    const { error } = noteValidationJoi.validate(credentials);
    if (error) {
      throw new BadRequest(error.message);
    }
    const dates = parseDateFromText(credentials.content);
    const createdNote = await Note.create({ ...credentials, dates });
    return createdNote;
  }

  async updateById(id: string, credentials: Note) {
    await this.getById(id);
    const { error } = noteValidationJoi.validate(credentials);
    if (error) {
      throw new BadRequest(error.message);
    }
    const dates = parseDateFromText(credentials.content);
    const [_, [updatedNote]] = await Note.update(
      { ...credentials, dates },
      { where: { id }, returning: true }
    );
    return updatedNote;
  }

  async deleteById(id: string) {
    const noteToDelete = await this.getById(id);
    await Note.destroy({ where: { id: noteToDelete.id } });
    return noteToDelete;
  }

  async handleArchived(id: string, credentials: { archived: boolean }) {
    await this.getById(id);
    const { error } = archivedValidationJoi.validate(credentials);
    if (error) {
      throw new BadRequest(error.message);
    }
    const [_, [updatedNote]] = await Note.update(
      { archived: credentials.archived },
      { where: { id }, returning: true }
    );
    return updatedNote;
  }

  async getStatistics() {}
}

const notesServices = new NotesServices();

export default notesServices;
