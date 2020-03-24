import {app} from "electron";
import {Sequelize} from "sequelize-typescript";
import {Patient} from "./patient";

const DATABASE_PATH = `${app.getPath("userData")}/databases/pat.db`;
console.log("DATABASE_PATH: ", DATABASE_PATH);

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

	public async getPatientById(id: number): Promise<Patient> {
		return Patient.findOne({where: {id}});
	}

	public async getPatienten(): Promise<Patient[]> {
		return Patient.findAll();
	}

	public async createPatient(patient: any): Promise<Patient> {
		return Patient.create(patient);
	}

	public async updatePatient(patient: any): Promise<[number, Patient[]]> {
		console.log(patient.dataValues);
		return Patient.update({
			chiffre: patient.chiffre,
			name: patient.name,
			antragsdatum: patient.antragsdatum,
			telefon: patient.telefon,
			konsiliararzt: patient.konsiliararzt,
			diagnose: patient.diagnose,
			bemerkung: patient.bemerkung,
		}, {where: {id: patient.id}});
	}

	public async destroyPatient(patient: any): Promise<number> {
		return Patient.destroy({where: {id: patient.id}});
	}

	private async initDb() {
		try {
			await this.sequelize.sync();
		} catch (e) {
			console.error(e);
		}
	}
}
