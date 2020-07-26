"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 8085;
app.get("/", (req, res) => {
    console.log(req.query);
    var sum = (+req.query.num1) + (+req.query.num2);
    res.send("Sum is " + sum);
});
app.listen(PORT, () => {
    console.log("Listening on ", PORT);
});
