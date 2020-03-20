import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule, InputTextModule, ProgressSpinnerModule, TableModule, ToolbarModule} from "primeng";

import {PageNotFoundComponent} from "./components/";
import {WebviewDirective} from "./directives/";
import {BackButtonDirective} from "./directives/backButton/back-button.directive";

@NgModule({
	declarations: [
		BackButtonDirective,
		PageNotFoundComponent,
		WebviewDirective,
	],
	imports: [
		ButtonModule,
		CommonModule,
		InputTextModule,
		FormsModule,
		ProgressSpinnerModule,
		ReactiveFormsModule,
		TableModule,
		ToolbarModule,
	],
	exports: [
		BackButtonDirective,
		ButtonModule,
		FormsModule,
		InputTextModule,
		ProgressSpinnerModule,
		ReactiveFormsModule,
		TableModule,
		ToolbarModule,
		WebviewDirective,
	],
})
export class SharedModule {
}
