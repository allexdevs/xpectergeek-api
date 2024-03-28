"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
const port = process.env.API_PORT;
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
