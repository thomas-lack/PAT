import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DiagnoseComponent} from "./diagnose/diagnose.component";
import {DiagnosenComponent} from "./diagnosen/diagnosen.component";
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
		path: "patient/:id",
		component: PatientComponent,
	},
	{
		path: "patienten",
		component: PatientenComponent,
	},
	{
		path: "diagnose",
		component: DiagnoseComponent,
	},
	{
		path: "diagnose/:id",
		component: DiagnoseComponent,
	},
	{
		path: "diagnosen",
		component: DiagnosenComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
