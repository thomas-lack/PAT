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
const sequelize_typescript_1 = require("sequelize-typescript");
const patient_1 = require("./patient");
const DATABASE_PATH = "./pat.db";
class DataAccess {
    constructor() {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: DATABASE_PATH,
            models: [patient_1.Patient],
        });
        this.initDb();
    }
    quit() {
        this.sequelize.close();
    }
    getPatienten() {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_1.Patient.findAll();
        });
    }
    initDb() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.sync();
        });
    }
}
exports.DataAccess = DataAccess;
//# sourceMappingURL=data-access.js.map