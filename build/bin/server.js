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
const app_1 = __importDefault(require("../app"));
const note_1 = require("../models/note");
const { PORT = 3000 } = process.env;
const serverStart = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield note_1.sequelize.authenticate();
        console.log('db connection succeeded');
        app_1.default.listen(PORT, () => {
            console.log(`Server running on address: http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(error.message);
        process.exit(1);
    }
});
serverStart();
