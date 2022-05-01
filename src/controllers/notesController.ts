import { Request, Response, NextFunction } from 'express';
import notesServices from '../services/notesServices';

class Controller {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notesServices.getAll();
      res.json(data);
    } catch (error: any) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials = req.body;
      const data = await notesServices.createNote(credentials);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}

const notesController = new Controller();

export default notesController;
