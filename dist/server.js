"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const indexRouting_1 = __importDefault(require("./routes/indexRouting"));
const databaseConfiguration_1 = require("./config/databaseConfiguration");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
//const db_user = process.env.DB_USER;
//const db_pass = process.env.DB_PASS;
//app.get("/" , (req: Request , res: Response) =>{
// res.send("Initial node js project")
//});
app.use(express_1.default.json());
(0, databaseConfiguration_1.connectDB)();
app.use('/api-v1', indexRouting_1.default);
app.listen(port, () => {
    console.log(`server is running:http://localhost:${port} `);
});
