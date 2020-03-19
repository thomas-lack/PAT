import {registerLocaleData} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import localeDe from "@angular/common/locales/de";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import "reflect-metadata";
import "../polyfills";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./home/home.module";
import {PatientenModule} from "./patienten/patienten.module";
import {SharedModule} from "./shared/shared.module";

registerLocaleData(localeDe, "de-DE");

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		CoreModule,
		SharedModule,
		HomeModule,
		AppRoutingModule,
		PatientenModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
}
