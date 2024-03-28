"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controllers
const email_controller_1 = __importDefault(require("../controllers/email.controller"));
const router = (0, express_1.Router)();
// rotas de email
router.get('/emails', email_controller_1.default.buscarEmails);
router.get('/get-email-by-name/:name', email_controller_1.default.pesquisarEmailPorNome);
router.post('/add-email', email_controller_1.default.adicionarEmail);
router.put('/update-email/:id', email_controller_1.default.atualizarEmail);
router.delete('/delete-email/:id', email_controller_1.default.deletarEmail);
exports.default = router;
