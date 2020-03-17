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

	private async initDb() {
		await this.sequelize.sync();

		const patienten = await Patient.findAll({
			where: {
				name: "Test Patient1",
			},
		});

		console.log("patienten", patienten);
	}
}
