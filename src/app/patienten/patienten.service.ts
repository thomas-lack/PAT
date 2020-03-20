import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {Model} from "sequelize-typescript";
import {DataAccess} from "../../../server/data-access";
import {ElectronService} from "../electron/electron.service";
import {Patient} from "../patient/patient.interface";

@Injectable({
	providedIn: "root",
})
export class PatientenService {

	private readonly dataAccess: DataAccess;

	constructor(private electronService: ElectronService) {
		const DataAccessModule = electronService.remote.require("./server/data-access");
		this.dataAccess = new DataAccessModule.DataAccess();
	}

	public getPatienten(): Observable<any> {
		return from(this.dataAccess.getPatienten());
	}

	public async create(patient: Patient) {
		try {
			const persistedPatient: Model = await this.dataAccess.create(patient);
			return persistedPatient.get();
		} catch (e) {
			console.error(e);
		}
	}

}
