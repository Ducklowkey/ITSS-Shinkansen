"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = require("mysql2");
const kysely_1 = require("kysely");
const dialect = new kysely_1.MysqlDialect({
    pool: (0, mysql2_1.createPool)({
        database: 'itss',
        host: 'battle-ship-phuongxxx971022-4df8.c.aivencloud.com',
        user: 'avnadmin',
        password: '',
        port: 16578,
        connectionLimit: 10,
    }),
});
exports.db = new kysely_1.Kysely({
    dialect,
});
//# sourceMappingURL=database.js.map