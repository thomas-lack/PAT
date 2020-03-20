import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {SharedModule, TableModule} from "primeng";
import {CoreModule} from "../core/core.module";
import {PatientenRoutingModule} from "./patienten-routing.module";
import {PatientenComponent} from "./patienten.component";

@NgModule({
	declarations: [
		PatientenComponent,
	],
	imports: [
		CoreModule,
		SharedModule,
		PatientenRoutingModule,
		CommonModule,
		TableModule,
	],
})
export class PatientenModule {
}
