import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from "primeng";

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';

@NgModule({
	declarations: [
		PageNotFoundComponent,
		WebviewDirective,
	],
	imports: [
		CommonModule,
		FormsModule,
		ProgressSpinnerModule,
	],
	exports: [
		WebviewDirective,
		FormsModule,
		ProgressSpinnerModule,
	],
})
export class SharedModule {
}
