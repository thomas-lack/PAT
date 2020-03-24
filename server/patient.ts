import {AllowNull, Column, CreatedAt, Model, Table, Unique, UpdatedAt} from "sequelize-typescript";

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
	antragsdatum: Date;

	@Column
	telefon: string;

	@Column
	konsiliararzt: string;

	@Column
	diagnose: string;

	@Column
	bemerkung: string;

	@CreatedAt
	creationDate!: Date;

	@UpdatedAt
	updatedOn!: Date;

}
