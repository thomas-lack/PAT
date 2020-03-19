import {NgModule} from "@angular/core";
import {CardModule} from "primeng";
import {SharedModule} from "../shared/shared.module";

import {HomeRoutingModule} from "./home-routing.module";

import {HomeComponent} from "./home.component";

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CardModule,
		SharedModule,
		HomeRoutingModule,
	],
})
export class HomeModule {
}
