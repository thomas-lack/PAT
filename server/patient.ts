import {AllowNull, Column, CreatedAt, Model, Table, UpdatedAt} from "sequelize-typescript";

@Table
export class Patient extends Model<Patient> {

	@AllowNull(false)
	@Column
	name!: string;

	@CreatedAt
	creationDate!: Date;

	@UpdatedAt
	updatedOn!: Date;

}
