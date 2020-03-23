import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule, ContextMenuModule, InputTextModule, ProgressSpinnerModule, TableModule, ToastModule, ToolbarModule} from "primeng";

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
		ContextMenuModule,
		InputTextModule,
		FormsModule,
		ProgressSpinnerModule,
		ReactiveFormsModule,
		TableModule,
		ToastModule,
		ToolbarModule,
	],
	exports: [
		BackButtonDirective,
		ButtonModule,
		ContextMenuModule,
		FormsModule,
		InputTextModule,
		ProgressSpinnerModule,
		ReactiveFormsModule,
		TableModule,
		ToastModule,
		ToolbarModule,
		WebviewDirective,
	],
})
export class SharedModule {
}
