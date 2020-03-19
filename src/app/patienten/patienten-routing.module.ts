import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PatientenComponent} from "./patienten.component";

const routes: Routes = [
	{
		path: "patienten",
		component: PatientenComponent,
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PatientenRoutingModule {
}
