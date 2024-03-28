"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class DAO {
    constructor(host, user, password, database, port) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.port = port;
    }
    conectar() {
        const connection = mysql_1.default.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port
        });
        return connection;
    }
}
exports.default = DAO;
