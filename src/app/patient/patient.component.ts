import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PatientenService} from "../patienten/patienten.service";
import {Patient} from "./patient.interface";

@Component({
	selector: "pat-patient",
	templateUrl: "./patient.component.html",
	styleUrls: ["./patient.component.scss"],
})
export class PatientComponent implements OnInit {

	public patientFormGroup: FormGroup;

	public patient: Patient;

	public isTxInProgress = false;

	constructor(
		private formBuilder: FormBuilder,
		private patientenService: PatientenService,
		private activatedRoute: ActivatedRoute,
	) {
	}

	ngOnInit() {
		this.initEmptyFormGroup();

		const id = this.activatedRoute.snapshot.params.id;
		if (id) {
			this.patientenService.getPatientById(id)
				.subscribe((patient: Patient) => {
					this.patient = patient;
					this.updateFormGroupFromPatient(patient);
				});
		}
	}

	public async onSubmit() {
		this.isTxInProgress = true;
		try {
			if (this.patient) {
				this.updatePatient();
			} else {
				this.createPatient();
			}
		} catch (e) {
			console.error(e);
		} finally {
			this.isTxInProgress = false;
		}
	}

	private async updatePatient() {
		this.patient.name = this.patientFormGroup.value.name;
		await this.patientenService.update(this.patient);
	}

	private async createPatient() {
		const patient = this.patientFormGroup.value;
		await this.patientenService.create(patient);
	}

	private initEmptyFormGroup() {
		this.patientFormGroup = this.formBuilder.group({
			name: [
				"",
				Validators.required,
			],
		});
	}

	private updateFormGroupFromPatient(patient: Patient) {
		this.patientFormGroup.setValue({
			name: patient.name,
		});
	}
}
