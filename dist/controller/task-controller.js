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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.getTasks = getTasks;
exports.updateTask = updateTask;
const connection_1 = require("../db/connection");
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = {
                id: req.body.id,
                date: req.body.date,
                description: req.body.description,
                is_finished: req.body.is_finished ? 1 : 0
            };
            const [results] = yield connection_1.mySqlConnection.query("INSERT INTO task SET ?", task);
            res.send({
                status: results.affectedRows > 0 ? "SUCCESS" : "FAILED"
            });
        }
        catch (err) {
            if (err instanceof Error) {
                res.send({
                    status: "FAILED",
                    message: err.message
                });
            }
            else {
                res.send({
                    status: "FAILED",
                    message: "An unknown error occurred."
                });
            }
        }
    });
}
function getTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield connection_1.mySqlConnection.query("SELECT * from task");
            const formattedRows = rows.map((row) => ({
                id: row.id,
                date: row.date.toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 10),
                description: row.description,
                is_finished: row.is_finished === 1
            }));
            res.send({
                status: "SUCCESS",
                data: formattedRows
            });
        }
        catch (err) {
            if (err instanceof Error) {
                res.send({
                    status: "FAILED",
                    message: err.message
                });
            }
            else {
                res.send({
                    status: "FAILED",
                    message: "An unknown error occurred."
                });
            }
        }
    });
}
function updateTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = {
                date: req.body.date,
                description: req.body.description,
                is_finished: req.body.is_finished ? 1 : 0
            };
            const taskId = req.params.id;
            const [results] = yield connection_1.mySqlConnection.query("UPDATE task SET ? WHERE id = ?", [task, taskId]);
            res.send({
                status: results.affectedRows > 0 ? "SUCCESS" : "FAILED"
            });
        }
        catch (err) {
            if (err instanceof Error) {
                res.send({
                    status: "FAILED",
                    message: err.message
                });
            }
            else {
                res.send({
                    status: "FAILED",
                    message: "An unknown error occurred."
                });
            }
        }
    });
}
//# sourceMappingURL=task-controller.js.map