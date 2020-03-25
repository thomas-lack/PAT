import {DataAccessInterface} from "./data-access.interface";
import {Diagnose} from "./diagnose";

export class DataAccessDiagnose implements DataAccessInterface<Diagnose> {

	public async getById(id: number): Promise<Diagnose> {
		return Diagnose.findOne({where: {id}});
	}

	public async create(diagnose: any): Promise<Diagnose> {
		return Diagnose.create(diagnose);
	}

	public async read(): Promise<Diagnose[]> {
		return Diagnose.findAll();
	}

	public async update(diagnose: any): Promise<[number, Diagnose[]]> {
		console.log(diagnose.dataValues);
		return Diagnose.update({
			name: diagnose.name,
		}, {where: {id: diagnose.id}});
	}

	public async destroy(diagnose: any): Promise<number> {
		return Diagnose.destroy({where: {id: diagnose.id}});
	}

}
