"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const note_1 = require("../../models/note");
const parseDateFromText_1 = __importDefault(require("../../utils/parseDateFromText"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    console.log(body);
    try {
        const { error } = note_1.noteValidationJoi.validate(body);
        if (error) {
            throw new http_errors_1.BadRequest(error.message);
        }
        const dates = (0, parseDateFromText_1.default)(body.content);
        const newNote = yield note_1.Note.create(Object.assign(Object.assign({}, body), { dates }));
        res.status(201).json({
            _id: newNote._id,
            name: newNote.name,
            category: newNote.category,
            content: newNote.content,
            dates: newNote.dates,
            archived: newNote.archived,
            createdAt: newNote.createdAt
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = create;
