import {Sequelize} from "sequelize-typescript";
import {Patient} from "./patient";

const DATABASE_PATH = "./pat.db";

export class DataAccess {

	private sequelize: Sequelize;

	constructor() {
		this.sequelize = new Sequelize({
			dialect: "sqlite",
			storage: DATABASE_PATH,
			models: [Patient],
		});
		this.initDb();
	}

	public quit() {
		this.sequelize.close();
	}

	public async getPatienten(): Promise<Patient[]> {
		return Patient.findAll();
	}

	private async initDb() {
		await this.sequelize.sync();
	}
}
