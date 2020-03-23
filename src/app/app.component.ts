import {Component} from "@angular/core";
import {MessageService} from "primeng";
import {AppConfig} from "../environments/environment";
import {ElectronService} from "./electron/electron.service";

@Component({
	selector: "pat-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	constructor(
		public electronService: ElectronService,
		public messageService: MessageService
	) {
		console.log("AppConfig", AppConfig);

		if (electronService.isElectron) {
			console.log(process.env);
			console.log("Mode electron");
			console.log("Electron ipcRenderer", electronService.ipcRenderer);
			console.log("NodeJS childProcess", electronService.childProcess);
		} else {
			console.log("Mode web");
		}
	}
}
