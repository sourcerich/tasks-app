"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const task_controller_1 = require("../controller/task-controller");
function routes(app) {
    app.post("/task", task_controller_1.createTask);
    app.get("/tasks", task_controller_1.getTasks);
    app.put("/task/:id", task_controller_1.updateTask);
}
//# sourceMappingURL=route.js.map