"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 8085;
app.get("/", (req, res) => {
    var _a;
    console.log(req.query);
    var dob = ((_a = req.query.dob) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    var luckeyNumber = 0;
    res.send("Sum is " + luckeyNumber);
});
app.listen(PORT, () => {
    console.log("Listening on ", PORT);
});
