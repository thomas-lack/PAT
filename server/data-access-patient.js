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
const patient_1 = require("./patient");
class DataAccessPatient {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_1.Patient.findOne({ where: { id } });
        });
    }
    create(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_1.Patient.create(patient);
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_1.Patient.findAll();
        });
    }
    update(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(patient.dataValues);
            return patient_1.Patient.update({
                chiffre: patient.chiffre,
                name: patient.name,
                telefon: patient.telefon,
                konsiliararzt: patient.konsiliararzt,
                diagnose: patient.diagnose,
                bemerkung: patient.bemerkung,
            }, { where: { id: patient.id } });
        });
    }
    destroy(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            return patient_1.Patient.destroy({ where: { id: patient.id } });
        });
    }
}
exports.DataAccessPatient = DataAccessPatient;
//# sourceMappingURL=data-access-patient.js.map