import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

// PrimeNg
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from "primeng/toolbar";
import { MenuModule } from "primeng/menu";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ToastModule } from "primeng/toast";
import { DropdownModule } from "primeng/dropdown";

// Componentes
import { LoginComponent } from "./Components/login/login.component";
import { PrincipalComponent } from "./Components/principal/principal.component";
import { BandComponent } from "./Components/opciones/band/band.component";
import { AuthenticationComponent } from "./Components/opciones/authentication/authentication.component";
import { SongComponent } from "./Components/opciones/song/song.component";
import { ResourcesComponent } from "./Components/opciones/resources/resources.component";
import { InstrumentComponent } from "./Components/opciones/instrument/instrument.component";
import { ScenographyComponent } from "./Components/opciones/scenography/scenography.component";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		PrincipalComponent,
		BandComponent,
		AuthenticationComponent,
		SongComponent,
		ResourcesComponent,
		InstrumentComponent,
		ScenographyComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		ButtonModule,
		InputTextModule,
		FormsModule,
		ToolbarModule,
		MenuModule,
		TableModule,
		DialogModule,
		ConfirmDialogModule,
		InputTextareaModule,
		ToastModule,
		DropdownModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
