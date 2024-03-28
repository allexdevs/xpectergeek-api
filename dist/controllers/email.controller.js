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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const Email_1 = __importDefault(require("../models/Email"));
const dao_1 = __importDefault(require("../util/dao"));
const DbInfo_1 = __importDefault(require("../models/DbInfo"));
const dbInfo = new DbInfo_1.default((_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : '', (_b = process.env.DB_NAME) !== null && _b !== void 0 ? _b : '', (_c = process.env.DB_USER) !== null && _c !== void 0 ? _c : '', (_d = process.env.DB_PASSWORD) !== null && _d !== void 0 ? _d : '', (_e = process.env.DB_PORT) !== null && _e !== void 0 ? _e : '');
const con = new dao_1.default(dbInfo.host, dbInfo.user, dbInfo.password, dbInfo.database, Number(dbInfo.port));
class EmailController {
    static buscarEmails(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = con.conectar();
            yield db.query({
                sql: 'SELECT * FROM emails',
                timeout: 5000,
            }, (err, result) => {
                if (err !== null) {
                    response.status(500).json({
                        status: 500,
                        erro: err,
                    });
                    db.end();
                }
                else {
                    const emails = [];
                    result.map((email) => {
                        emails.push(new Email_1.default(email.id, email.nome, email.sobrenome, email.empresa, email.mensagem, email.email, email.checked, email.created_at, email.updated_at));
                    });
                    response.status(200).json({
                        status: 200,
                        mensagem: 'Dados retornados com sucesso',
                        payload: emails,
                    });
                    db.end();
                }
            });
        });
    }
    static adicionarEmail(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = con.conectar();
            const email = new Email_1.default(0, request.body.nome, request.body.sobrenome, request.body.empresa, request.body.mensagem, request.body.email, request.body.checked, request.body.created_at, request.body.updated_at);
            yield db.query({
                sql: 'INSERT INTO emails (nome, sobrenome, empresa, mensagem, email, checked, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)',
                timeout: 5000,
                values: [
                    `${email.nome}`,
                    `${email.sobrenome}`,
                    `${email.empresa}`,
                    `${email.mensagem}`,
                    `${email.email}`,
                    email.checked,
                    `${email.created_at}`,
                    `${email.updated_at}`,
                ],
            }, (err, result, fields) => {
                if (err !== null) {
                    response.status(500).json({
                        status: 500,
                        mensagem: 'Ocorreu um erro, não foi possível completar a solicitação.',
                        erro: err,
                        fields,
                    });
                    db.end();
                }
                else {
                    response.status(201).json({
                        status: 201,
                        mensagem: 'Email enviado com sucesso',
                        payload: {
                            nome: email.nome,
                            sobrenome: email.sobrenome,
                            empresa: email.empresa,
                            email: email.email,
                            checked: email.checked,
                            created_at: email.created_at,
                            updated_at: email.updated_at,
                        },
                        fields: fields,
                    });
                    db.end();
                }
            });
        });
    }
    static deletarEmail(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = con.conectar();
            const id = request.params.id;
            db.query({
                sql: 'DELETE FROM emails WHERE id = ?',
                timeout: 5000,
                values: [id],
            }, (err, result, fields) => {
                if (err !== null) {
                    response.status(500).json({
                        status: 500,
                        mensagem: 'Ocorreu um erro, não foi possível completar a solicitação.',
                        erro: err,
                        fields: fields,
                    });
                    db.end();
                }
                else {
                    response.status(200).json({
                        status: 200,
                        mensagem: 'Email excluído com sucesso',
                    });
                    db.end();
                }
            });
        });
    }
    static pesquisarEmailPorNome(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = con.conectar();
            const nome = request.params.name;
            db.query({
                sql: `SELECT * FROM emails WHERE nome LIKE '%${nome}%'`,
                timeout: 5000,
            }, (err, result) => {
                if (err !== null) {
                    response.status(500).json({
                        status: 500,
                        mensagem: 'Ocorreu um erro, não foi possível completar a solicitação.',
                        erro: err,
                    });
                    db.end();
                }
                else {
                    response.status(200).json({
                        status: 200,
                        mensagem: 'Email(s) encontrado(s) com sucesso',
                        payload: result,
                    });
                    db.end();
                }
            });
        });
    }
    static atualizarEmail(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = con.conectar();
            const email = new Email_1.default(Number(request.params.id), request.body.nome, request.body.sobrenome, request.body.empresa, request.body.mensagem, request.body.email, request.body.checked, request.body.created_at, request.body.updated_at);
            db.query({
                sql: `
          UPDATE emails SET
          nome = '${email.nome}', 
          sobrenome = '${email.sobrenome}',
          empresa = '${email.empresa}',
          mensagem = '${email.mensagem}',
          email = '${email.email}',
          checked = ${email.checked},
          created_at = '${email.created_at}',
          updated_at = '${email.updated_at}'
          WHERE id = ${email.id}
        `,
                timeout: 5000,
            }, (err, result) => {
                if (err !== null) {
                    response.status(500).json({
                        status: 500,
                        mensagem: 'Ocorreu um erro, não foi possível completar a solicitação.',
                        erro: err,
                    });
                    db.end();
                }
                else {
                    response.status(200).json({
                        status: 200,
                        mensagem: 'Email atualizado com sucesso',
                    });
                    db.end();
                }
            });
        });
    }
}
exports.default = EmailController;
