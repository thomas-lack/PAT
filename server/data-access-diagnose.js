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
const diagnose_1 = require("./diagnose");
class DataAccessDiagnose {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return diagnose_1.Diagnose.findOne({ where: { id } });
        });
    }
    create(diagnose) {
        return __awaiter(this, void 0, void 0, function* () {
            return diagnose_1.Diagnose.create(diagnose);
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            return diagnose_1.Diagnose.findAll();
        });
    }
    update(diagnose) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(diagnose.dataValues);
            return diagnose_1.Diagnose.update({
                name: diagnose.name,
            }, { where: { id: diagnose.id } });
        });
    }
    destroy(diagnose) {
        return __awaiter(this, void 0, void 0, function* () {
            return diagnose_1.Diagnose.destroy({ where: { id: diagnose.id } });
        });
    }
}
exports.DataAccessDiagnose = DataAccessDiagnose;
//# sourceMappingURL=data-access-diagnose.js.map