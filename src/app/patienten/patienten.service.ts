import {Injectable} from "@angular/core";
import {MessageService} from "primeng";
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

	constructor(
		private electronService: ElectronService,
		private messageService: MessageService
	) {
		const DataAccessModule = electronService.remote.require("./server/data-access");
		this.dataAccess = new DataAccessModule.DataAccess();
	}

	public getPatienten(): Observable<any> {
		return from(this.dataAccess.getPatienten());
	}

	public async create(patient: Patient) {
		try {
			const persistedPatient: Model = await this.dataAccess.create(patient);
			this.messageService.add({
				severity: "success",
				summary: "Patient erfolgreich angelegt",
			});
			return persistedPatient.get();
		} catch (e) {
			this.messageService.add({
				severity: "error",
				summary: `Patient konnte nicht angelegt werden - Grund: ${this.parseErrorToReason(e)}`,
			});
		}
	}

	private parseErrorToReason(e: Error): string {
		let reason = "Unbekannt";
		if (e.name === "SequelizeUniqueConstraintError") {
			reason = "Ein Patient mit diesem Namen ist bereits vorhanden";
		}
		return reason;
	}

}
