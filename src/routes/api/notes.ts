import express from 'express';
import create from '../../controllers/notes/create';
import deleteById from '../../controllers/notes/deleteById';
import getAll from '../../controllers/notes/getAll';
import getById from '../../controllers/notes/getById';
import handleArchive from '../../controllers/notes/handleArchived';
import updateById from '../../controllers/notes/updateById';
import getStats from '../../controllers/notes/getStats';
const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.get('/stats', getStats);
router.get('/:id', getById);
router.patch('/:id', updateById);
router.patch('/:id/archived', handleArchive);
router.delete('/:id', deleteById);

export default router;
