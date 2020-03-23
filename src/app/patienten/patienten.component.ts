import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MenuItem} from "primeng";
import {Observable} from "rxjs";
import {Patient} from "../patient/patient.interface";
import {PatientenService} from "./patienten.service";

@Component({
	selector: "pat-patienten",
	templateUrl: "./patienten.component.html",
	styleUrls: ["./patienten.component.scss"],
})
export class PatientenComponent implements OnInit {

	public patienten: Observable<Patient[]>;

	public selectedPatient: Patient;

	public editMenuItems: MenuItem[] = [
		{
			label: "Bearbeiten",
			icon: "pi pi-fw pi-pencil",
			command: (event) => this.onPatientBearbeitenClick(this.selectedPatient),
		},
		{
			label: "Löschen",
			icon: "pi pi-fw pi-trash",
		},
	];

	constructor(
		private patientenService: PatientenService,
		private router: Router,
	) {
	}

	ngOnInit() {
		this.patienten = this.patientenService.getPatienten();
	}

	onBackButtonClick() {
		this.router.navigate(["/"]);
	}

	onPatientBearbeitenClick(patient: Patient) {
		this.router.navigate(["/patient", patient.id]);
	}
}
