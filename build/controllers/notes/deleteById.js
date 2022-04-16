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
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const note_1 = require("../../models/note");
const deleteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    try {
        const note = yield note_1.Note.findByIdAndDelete({ _id });
        if (!note) {
            throw new http_errors_1.NotFound(`Note with id: ${_id} does not exist`);
        }
        res.json({
            message: 'Note deleted successfully',
            note: note
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = deleteById;
