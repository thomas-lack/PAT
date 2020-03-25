import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DiagnosenService} from "../diagnosen/diagnosen.service";
import {Diagnose} from "./diagnose.interface";

@Component({
	selector: "pat-diagnose",
	templateUrl: "./diagnose.component.html",
	styleUrls: ["./diagnose.component.scss"],
})
export class DiagnoseComponent implements OnInit {

	public diagnoseFormGroup: FormGroup;

	public diagnose: Diagnose;

	public isTxInProgress = false;

	constructor(
		private formBuilder: FormBuilder,
		private diagnosenService: DiagnosenService,
		private activatedRoute: ActivatedRoute,
	) {
	}

	ngOnInit() {
		this.initEmptyFormGroup();

		const id = this.activatedRoute.snapshot.params.id;
		if (id) {
			this.diagnosenService.getById(id)
				.subscribe((diagnose: Diagnose) => {
					this.diagnose = diagnose;
					this.updateFormGroupFromDiagnose(diagnose);
				});
		}
	}

	public async onSubmit() {
		this.isTxInProgress = true;
		try {
			if (this.diagnose) {
				this.updateDiagnose();
			} else {
				this.createDiagnose();
			}
		} catch (e) {
			console.error(e);
		} finally {
			this.isTxInProgress = false;
		}
	}

	private async updateDiagnose() {
		this.diagnose.name = this.diagnoseFormGroup.value.name;
		await this.diagnosenService.update(this.diagnose);
	}

	private async createDiagnose() {
		const diagnose = this.diagnoseFormGroup.value;
		await this.diagnosenService.create(diagnose);
	}

	private initEmptyFormGroup() {
		this.diagnoseFormGroup = this.formBuilder.group({
			name: [
				"",
				Validators.required,
			],
		});
	}

	private updateFormGroupFromDiagnose(diagnose: Diagnose) {
		this.diagnoseFormGroup.setValue({
			name: diagnose.name,
		});
	}
}
