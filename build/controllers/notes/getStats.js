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
const note_1 = require("../../models/note");
const getActiveNotesCount = (arr) => {
    return arr.filter(el => !el).length;
};
const getArchivedNotesCount = (arr) => {
    return arr.filter(el => el).length;
};
const getStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statistics = [];
    try {
        const data = yield note_1.Note.aggregate([
            {
                $group: {
                    _id: '$category',
                    isArchived: {
                        $push: '$archived'
                    }
                }
            }
        ]);
        data.forEach(el => {
            const stats = {
                category: el._id,
                active: getActiveNotesCount(el.isArchived),
                archived: getArchivedNotesCount(el.isArchived)
            };
            statistics.push(stats);
        });
        res.json(statistics);
    }
    catch (error) {
        next(error);
    }
});
exports.default = getStats;
