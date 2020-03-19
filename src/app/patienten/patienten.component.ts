import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Patient} from "./patient.interface";
import {PatientenService} from "./patienten.service";

@Component({
	selector: "pat-patienten",
	templateUrl: "./patienten.component.html",
	styleUrls: ["./patienten.component.scss"],
})
export class PatientenComponent implements OnInit {

	public patienten: Observable<Patient[]>;

	constructor(private patientenService: PatientenService) {
	}

	ngOnInit() {
		this.patienten = this.patientenService.getPatienten();
	}
}
