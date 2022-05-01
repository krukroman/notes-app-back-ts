"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archivedValidationJoi = exports.noteValidationJoi = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const joi_1 = __importDefault(require("joi"));
require('dotenv').config();
const { POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
if (!POSTGRES_USER)
    throw new Error('Postgres user name does not exist');
exports.sequelize = new sequelize_1.Sequelize('notes_db', POSTGRES_USER, POSTGRES_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost'
});
class Note extends sequelize_1.Model {
}
Note.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    dates: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: ''
    },
    archived: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, { sequelize: exports.sequelize, tableName: 'notes' });
exports.noteValidationJoi = joi_1.default.object({
    name: joi_1.default.string().required().min(1),
    category: joi_1.default.string().required(),
    content: joi_1.default.string().required().min(1)
});
exports.archivedValidationJoi = joi_1.default.object({
    archived: joi_1.default.boolean().required()
});
exports.default = Note;
