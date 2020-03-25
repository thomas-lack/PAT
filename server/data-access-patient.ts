import {DataAccessInterface} from "./data-access.interface";
import {Patient} from "./patient";

export class DataAccessPatient implements DataAccessInterface<Patient> {

	public async getById(id: number): Promise<Patient> {
		return Patient.findOne({where: {id}});
	}

	public async create(patient: any): Promise<Patient> {
		return Patient.create(patient);
	}

	public async read(): Promise<Patient[]> {
		return Patient.findAll();
	}

	public async update(patient: any): Promise<[number, Patient[]]> {
		console.log(patient.dataValues);
		return Patient.update({
			chiffre: patient.chiffre,
			name: patient.name,
			telefon: patient.telefon,
			konsiliararzt: patient.konsiliararzt,
			diagnose: patient.diagnose,
			bemerkung: patient.bemerkung,
		}, {where: {id: patient.id}});
	}

	public async destroy(patient: any): Promise<number> {
		return Patient.destroy({where: {id: patient.id}});
	}

}
