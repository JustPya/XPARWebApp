import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/Services/general.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	public username: string;
	public password: string;
	public progress: boolean = false;

	constructor(private service: GeneralService, private router: Router) {
		if (sessionStorage.getItem("user")) {
			this.router.navigateByUrl("/administrador");
		}
	}

	ngOnInit() {}

	login() {
		this.progress = true;
		this.service.loginUser(this.username, this.password).subscribe(
			respuesta => {
				if (respuesta.status == "ok") {
					sessionStorage.setItem("user", this.username);
					sessionStorage.setItem("ssap", this.password);
					this.router.navigateByUrl("/administrador");
				} else {
				}
				this.progress = false;
			},
			error => {}
		);
	}
}
