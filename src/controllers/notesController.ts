import { Request, Response, NextFunction } from 'express';
import notesServices from '../services/notesServices';

class Controller {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const notes = await notesServices.getAll();
      res.json(notes);
    } catch (error: any) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const note = await notesServices.getById(id);
      res.json(note);
    } catch (error: any) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials = req.body;
      const createdNote = await notesServices.create(credentials);
      res.status(201).json(createdNote);
    } catch (error: any) {
      next(error);
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const credentials = req.body;
      const updatedNote = await notesServices.updateById(id, credentials);
      res.json(updatedNote);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await notesServices.deleteById(id);
      res.json({
        message: 'Note deleted',
        result
      });
    } catch (error: any) {
      next(error);
    }
  }

  async handleArchived(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const credentials = req.body;
      const updatedNote = await notesServices.handleArchived(id, credentials);
      res.json(updatedNote);
    } catch (error: any) {
      next(error);
    }
  }
}

const notesController = new Controller();

export default notesController;
