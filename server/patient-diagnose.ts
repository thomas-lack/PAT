import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {Diagnose} from "./diagnose";
import {Patient} from "./patient";

@Table
export class PatientDiagnose extends Model<PatientDiagnose> {

	@ForeignKey(() => Patient)
	@Column
	patientId: number;

	@ForeignKey(() => Diagnose)
	@Column
	diagnoseId: number;
}
