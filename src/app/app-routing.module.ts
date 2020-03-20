import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PatientComponent} from "./patient/patient.component";
import {PatientenComponent} from "./patienten/patienten.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "patient",
		component: PatientComponent,
	},
	{
		path: "patienten",
		component: PatientenComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
