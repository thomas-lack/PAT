import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {DataAccess} from "../../server/data-access";
import {ElectronService} from "../core/services";

@Injectable({
	providedIn: "root",
})
export class PatientenService {

	private readonly dataAccess: DataAccess;

	constructor(private electronService: ElectronService) {
		const DataAccessModule = electronService.remote.require("./src/server/data-access");
		this.dataAccess = new DataAccessModule.DataAccess();
	}

	public getPatienten(): Observable<any> {
		return from(this.dataAccess.getPatienten());
	}

}
