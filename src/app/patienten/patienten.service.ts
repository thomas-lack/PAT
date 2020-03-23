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
		private messageService: MessageService,
	) {
		const DataAccessModule = electronService.remote.require("./server/data-access");
		this.dataAccess = new DataAccessModule.DataAccess();
	}

	public getPatientById(id: number): Observable<any> {
		return from(this.dataAccess.getPatientById(id));
	}

	public getPatienten(): Observable<any> {
		return from(this.dataAccess.getPatienten());
	}

	public async create(patient: Patient) {
		try {
			const persistedPatient: Model = await this.dataAccess.createPatient(patient);
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

	public async update(patient: Patient) {
		try {
			const persistedPatient = await this.dataAccess.updatePatient(patient);
			this.messageService.add({
				severity: "success",
				summary: "Patient erfolgreich bearbeitet",
			});
			return persistedPatient;
		} catch (e) {
			this.messageService.add({
				severity: "error",
				summary: `Patient konnte nicht bearbeitet werden - Grund: ${this.parseErrorToReason(e)}`,
			});
		}
	}

	public async destroy(patient: Patient) {
		try {
			const destroyedPatient = await this.dataAccess.destroyPatient(patient);
			this.messageService.add({
				severity: "success",
				summary: "Patient erfolgreich gelöscht",
			});
			return destroyedPatient;
		} catch (e) {
			this.messageService.add({
				severity: "error",
				summary: `Patient konnte nicht gelöscht werden - Grund: ${this.parseErrorToReason(e)}`,
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
