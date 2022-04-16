"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_HOST, PORT = 3000 } = process.env;
if (!DB_HOST) {
    throw new Error(`Please set data base gate to connect`);
}
mongoose_1.default
    .connect(DB_HOST)
    .then(() => {
    console.log(`Connect to MongoDb is success`);
    __1.default.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
    });
})
    .catch((error) => {
    console.log(error.message);
    process.exit(1);
});
