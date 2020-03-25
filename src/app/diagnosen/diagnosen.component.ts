import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MenuItem} from "primeng";
import {Observable} from "rxjs";
import {Diagnose} from "../diagnose/diagnose.interface";
import {DiagnosenService} from "./diagnosen.service";

@Component({
	selector: "pat-diagnosen",
	templateUrl: "./diagnosen.component.html",
	styleUrls: ["./diagnosen.component.scss"],
})
export class DiagnosenComponent implements OnInit {

	public diagnosen: Observable<Diagnose[]>;

	public selectedDiagnose: Diagnose;

	public editMenuItems: MenuItem[] = [
		{
			label: "Bearbeiten",
			icon: "pi pi-fw pi-pencil",
			command: () => this.onEditDiagnoseClick(this.selectedDiagnose),
		},
		{
			label: "Löschen",
			icon: "pi pi-fw pi-trash",
			command: () => this.onDestroyDiagnoseClick(this.selectedDiagnose),
		},
	];

	constructor(
		private diagnosenService: DiagnosenService,
		private router: Router,
	) {
	}

	ngOnInit() {
		this.getDiagnosen();
	}

	private getDiagnosen() {
		this.diagnosen = this.diagnosenService.read();
	}

	private onEditDiagnoseClick(diagnose: Diagnose) {
		this.router.navigate([
			"/diagnose",
			diagnose.id,
		]);
	}

	private onDestroyDiagnoseClick(diagnose: Diagnose) {
		this.diagnosenService.destroy(diagnose);
		this.getDiagnosen();
	}
}
