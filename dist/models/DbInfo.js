"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DbInfo {
    constructor(host, database, user, password, port) {
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port;
    }
}
exports.default = DbInfo;
