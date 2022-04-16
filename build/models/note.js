"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveValidationJoi = exports.noteValidationJoi = exports.Note = void 0;
const mongoose_1 = require("mongoose");
const Joi = __importStar(require("joi"));
const noteSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, `Set name for note`]
    },
    category: {
        type: String,
        required: [true, `Set category for note`]
    },
    content: {
        type: String,
        required: [true, `Set comment for note`]
    },
    dates: {
        type: String,
        default: ''
    },
    archived: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Note = (0, mongoose_1.model)('note', noteSchema);
exports.noteValidationJoi = Joi.object({
    name: Joi.string().required().min(1),
    category: Joi.string().required(),
    content: Joi.string().required().min(1)
});
exports.archiveValidationJoi = Joi.object({
    archived: Joi.boolean().required()
});
