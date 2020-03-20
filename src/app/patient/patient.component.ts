import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientenService} from "../patienten/patienten.service";

@Component({
	selector: "pat-patient",
	templateUrl: "./patient.component.html",
	styleUrls: ["./patient.component.scss"],
})
export class PatientComponent implements OnInit {

	public patientFormGroup: FormGroup;

	public isTxInProgress = false;

	constructor(
		private formBuilder: FormBuilder,
		private patientenService: PatientenService
	) {
	}

	ngOnInit() {
		this.patientFormGroup = this.formBuilder.group({
			name: [
				"",
				Validators.required,
			],
		});
	}

	public async onSubmit() {
		this.isTxInProgress = true;
		const patient = this.patientFormGroup.value;
		try {
			await this.patientenService.create(patient);
		} catch (e) {
			console.error(e);
		} finally {
			this.isTxInProgress = false;
		}
	}
}
