import {registerLocaleData} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import localeDe from "@angular/common/locales/de";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import "reflect-metadata";
import "../polyfills";
import {MessageService} from "primeng";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {ElectronService} from "./electron/electron.service";
import {HomeModule} from "./home/home.module";
import {PatientComponent} from "./patient/patient.component";
import {PatientenComponent} from "./patienten/patienten.component";
import {SharedModule} from "./shared/shared.module";

registerLocaleData(localeDe, "de-DE");

@NgModule({
	declarations: [
		AppComponent,
		PatientComponent,
		PatientenComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		SharedModule,
		HomeModule,
		AppRoutingModule,
	],
	providers: [
		ElectronService,
		MessageService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
