import {Injectable} from "@angular/core";
import {MessageService} from "primeng";
import {from, Observable} from "rxjs";
import {Model} from "sequelize-typescript";
import {DataAccessDiagnose} from "../../../server/data-access-diagnose";
import {Diagnose} from "../diagnose/diagnose.interface";
import {ElectronService} from "../electron/electron.service";

@Injectable({
	providedIn: "root",
})
export class DiagnosenService {

	private readonly dataAccess: DataAccessDiagnose;

	constructor(
		private electronService: ElectronService,
		private messageService: MessageService,
	) {
		const DataAccessModule = electronService.remote.require("./server/data-access-diagnose");
		this.dataAccess = new DataAccessModule.DataAccessDiagnose();
	}

	public getById(id: number): Observable<any> {
		return from(this.dataAccess.getById(id));
	}

	public read(): Observable<any> {
		return from(this.dataAccess.read());
	}

	public async create(diagnose: Diagnose) {
		try {
			const persistedDiagnose: Model = await this.dataAccess.create(diagnose);
			this.messageService.add({
				severity: "success",
				summary: "Diagnose erfolgreich angelegt",
			});
			return persistedDiagnose.get();
		} catch (e) {
			this.messageService.add({
				severity: "error",
				summary: `Diagnose konnte nicht angelegt werden - Grund: ${this.parseErrorToReason(e)}`,
			});
		}
	}

	public async update(diagnose: Diagnose) {
		try {
			const persistedDiagnose = await this.dataAccess.update(diagnose);
			this.messageService.add({
				severity: "success",
				summary: "Diagnose erfolgreich bearbeitet",
			});
			return persistedDiagnose;
		} catch (e) {
			this.messageService.add({
				severity: "error",
				summary: `Diagnose konnte nicht bearbeitet werden - Grund: ${this.parseErrorToReason(e)}`,
			});
		}
	}

	public async destroy(diagnose: Diagnose) {
		try {
			const destroyedDiagnose = await this.dataAccess.destroy(diagnose);
			this.messageService.add({
				severity: "success",
				summary: "Diagnose erfolgreich gelöscht",
			});
			return destroyedDiagnose;
		} catch (e) {
			this.messageService.add({
				severity: "error",
				summary: `Diagnose konnte nicht gelöscht werden - Grund: ${this.parseErrorToReason(e)}`,
			});
		}
	}

	private parseErrorToReason(e: Error): string {
		let reason = "Unbekannt";
		if (e.name === "SequelizeUniqueConstraintError") {
			reason = "Eine Diagnose mit diesem Namen ist bereits vorhanden";
		}
		return reason;
	}

}
