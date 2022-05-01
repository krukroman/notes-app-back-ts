"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesController_1 = __importDefault(require("../../controllers/notesController"));
const router = express_1.default.Router();
router.get('/', notesController_1.default.getAll);
router.post('/', notesController_1.default.create);
router.get('/stats');
router.get('/:id');
router.patch('/:id');
router.patch('/:id/archived');
router.delete('/:id');
exports.default = router;
