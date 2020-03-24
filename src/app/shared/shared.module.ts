import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
	ButtonModule,
	CalendarModule,
	ContextMenuModule,
	InputTextarea, InputTextareaModule,
	InputTextModule,
	ProgressSpinnerModule,
	TableModule,
	ToastModule,
	ToolbarModule
} from "primeng";

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
		CalendarModule,
		CommonModule,
		ContextMenuModule,
		InputTextModule,
		InputTextareaModule,
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
		CalendarModule,
		ContextMenuModule,
		FormsModule,
		InputTextModule,
		InputTextareaModule,
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
