import {AllowNull, Column, CreatedAt, Model, Table, Unique, UpdatedAt} from "sequelize-typescript";

@Table
export class Patient extends Model<Patient> {

	@AllowNull(false)
	@Unique
	@Column
	name!: string;

	@CreatedAt
	creationDate!: Date;

	@UpdatedAt
	updatedOn!: Date;

}
