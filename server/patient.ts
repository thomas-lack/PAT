import {AllowNull, BelongsToMany, Column, CreatedAt, HasMany, Model, Table, Unique, UpdatedAt} from "sequelize-typescript";
import {Diagnose} from "./diagnose";
import {PatientDiagnose} from "./patient-diagnose";

@Table
export class Patient extends Model<Patient> {

	@AllowNull(false)
	@Unique
	@Column
	chiffre!: string;

	@AllowNull(false)
	@Column
	name!: string;

	@Column
	telefon: string;

	@Column
	konsiliararzt!: string;

	@BelongsToMany(() => Diagnose, () => PatientDiagnose)
	diagnoses: Diagnose[];

	@Column
	bemerkung: string;

	@CreatedAt
	creationDate!: Date;

	@UpdatedAt
	updatedOn!: Date;

}
