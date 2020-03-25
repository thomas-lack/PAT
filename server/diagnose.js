"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const patient_1 = require("./patient");
const patient_diagnose_1 = require("./patient-diagnose");
let Diagnose = class Diagnose extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Diagnose.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => patient_1.Patient, () => patient_diagnose_1.PatientDiagnose),
    __metadata("design:type", Array)
], Diagnose.prototype, "patients", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Diagnose.prototype, "creationDate", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Diagnose.prototype, "updatedOn", void 0);
Diagnose = __decorate([
    sequelize_typescript_1.Table
], Diagnose);
exports.Diagnose = Diagnose;
//# sourceMappingURL=diagnose.js.map