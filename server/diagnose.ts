import {AllowNull, BelongsToMany, Column, CreatedAt, Model, Table, Unique, UpdatedAt} from "sequelize-typescript";
import {Patient} from "./patient";
import {PatientDiagnose} from "./patient-diagnose";

@Table
export class Diagnose extends Model<Diagnose> {

	@AllowNull(false)
	@Unique
	@Column
	name!: string;

	@BelongsToMany(() => Patient, () => PatientDiagnose)
	patients: Patient[];

	@CreatedAt
	creationDate!: Date;

	@UpdatedAt
	updatedOn!: Date;
}
