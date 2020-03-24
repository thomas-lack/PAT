import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PatientenService} from "../patienten/patienten.service";
import {calendarLocale} from "../shared/calendar/calendar-locale";
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

	public calendarLocale = calendarLocale;

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
		this.patient.chiffre = this.patientFormGroup.value.chiffre;
		this.patient.name = this.patientFormGroup.value.name;
		this.patient.antragsdatum = this.patientFormGroup.value.antragsdatum;
		this.patient.telefon = this.patientFormGroup.value.telefon;
		this.patient.konsiliararzt = this.patientFormGroup.value.konsiliararzt;
		this.patient.diagnose = this.patientFormGroup.value.diagnose;
		this.patient.bemerkung = this.patientFormGroup.value.bemerkung;
		await this.patientenService.update(this.patient);
	}

	private async createPatient() {
		const patient = this.patientFormGroup.value;
		await this.patientenService.create(patient);
	}

	private initEmptyFormGroup() {
		this.patientFormGroup = this.formBuilder.group({
			chiffre: [
				"",
				Validators.required,
			],
			name: [
				"",
				Validators.required,
			],
			antragsdatum: [""],
			telefon: [""],
			konsiliararzt: [""],
			diagnose: [""],
			bemerkung: [""],
		});
	}

	private updateFormGroupFromPatient(patient: Patient) {
		this.patientFormGroup.setValue({
			chiffre: patient.chiffre,
			name: patient.name,
			antragsdatum: patient.antragsdatum,
			telefon: patient.telefon,
			konsiliararzt: patient.konsiliararzt,
			diagnose: patient.diagnose,
			bemerkung: patient.bemerkung,
		});
	}
}
