import express from 'express';
import notesController from '../../controllers/notesController';

const router = express.Router();

router.get('/', notesController.getAll);
router.post('/', notesController.create);
router.get('/stats');
router.get('/:id', notesController.getById);
router.patch('/:id', notesController.updateById);
router.patch('/:id/archived', notesController.handleArchived);
router.delete('/:id', notesController.deleteById);

export default router;
