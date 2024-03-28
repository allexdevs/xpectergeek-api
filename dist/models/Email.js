"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Email {
    constructor(id, nome, sobrenome, empresa, mensagem, email, checked, createdAt, updatedAt) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.empresa = empresa;
        this.mensagem = mensagem;
        this.email = email;
        this.checked = checked;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
    }
}
exports.default = Email;
