import express from 'express';
import notesController from '../../controllers/notesController';

const router = express.Router();

router.get('/', notesController.getAll);
router.post('/', notesController.create);
router.get('/stats');
router.get('/:id');
router.patch('/:id');
router.patch('/:id/archived');
router.delete('/:id');

export default router;
