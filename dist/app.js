"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = require("./routes/route");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
(0, route_1.routes)(app);
app.listen(PORT, () => {
    console.log(`Server is runnung in http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map