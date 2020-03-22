import {app} from "electron";
import {Sequelize} from "sequelize-typescript";
import {Patient} from "./patient";

const DATABASE_PATH = `${app.getPath("userData")}/databases/pat.db`;

export class DataAccess {

	private sequelize: Sequelize;

	constructor() {
		try {
			this.sequelize = new Sequelize({
				dialect: "sqlite",
				storage: DATABASE_PATH,
				models: [Patient],
			});
		} catch (e) {
			console.error(e);
		}
		this.initDb();
	}

	public quit() {
		this.sequelize.close();
	}

	public async getPatienten(): Promise<Patient[]> {
		return Patient.findAll();
	}

	public async create(patient: any): Promise<Patient> {
		return Patient.create(patient);
	}

	private async initDb() {
		try {
			await this.sequelize.sync();
		} catch (e) {
			console.error(e);
		}
	}
}
