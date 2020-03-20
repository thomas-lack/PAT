import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
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

	constructor(
		private patientenService: PatientenService,
		private router: Router,
	) {
	}

	ngOnInit() {
		this.patienten = this.patientenService.getPatienten();
	}

	onBackButtonClick() {
		console.log("1");
		this.router.navigate(["/"]);
	}
}
