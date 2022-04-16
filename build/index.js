"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const errorHandler_1 = __importDefault(require("./helpers/errorHandler"));
const notes_1 = __importDefault(require("./routes/api/notes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/notes', notes_1.default);
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
app.use(errorHandler_1.default);
exports.default = app;
