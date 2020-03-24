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
const electron_1 = require("electron");
const sequelize_typescript_1 = require("sequelize-typescript");
const patient_1 = require("./patient");
const DATABASE_PATH = `${electron_1.app.getPath("userData")}/databases/pat.db`;
console.log("DATABASE_PATH: ", DATABASE_PATH);
class DataAccess {
    constructor() {
        try {
            this.sequelize = new sequelize_typescript_1.Sequelize({
                dialect: "sqlite",
                storage: DATABASE_PATH,
                models: [patient_1.Patient],
            });
        }
        catch (e) {
            console.error(e);
        }
        this.initDb();
    }
    quit() {
        this.sequelize.close();
    }
    getPatientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_1.Patient.findOne({ where: { id } });
        });
    }
    getPatienten() {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_1.Patient.findAll();
        });
    }
    createPatient(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_1.Patient.create(patient);
        });
    }
    updatePatient(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(patient.dataValues);
            return patient_1.Patient.update({
                chiffre: patient.chiffre,
                name: patient.name,
                antragsdatum: patient.antragsdatum,
                telefon: patient.telefon,
                konsiliararzt: patient.konsiliararzt,
                diagnose: patient.diagnose,
                bemerkung: patient.bemerkung,
            }, { where: { id: patient.id } });
        });
    }
    destroyPatient(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_1.Patient.destroy({ where: { id: patient.id } });
        });
    }
    initDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.sync();
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.DataAccess = DataAccess;
//# sourceMappingURL=data-access.js.map