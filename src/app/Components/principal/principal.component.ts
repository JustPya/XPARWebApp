import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api/menuitem";

@Component({
	selector: "app-principal",
	templateUrl: "./principal.component.html",
	styleUrls: ["./principal.component.scss"]
})
export class PrincipalComponent implements OnInit {
	public items: MenuItem[];
	public option: number = 1;

	constructor(private router: Router) {
		if (!sessionStorage.getItem("user")) {
			this.router.navigateByUrl("/login");
		}

		this.items = [
			{
				label: "Menu",
				items: [
					{ id: "1", label: "Bandas", icon: "pi pi-angle-double-right", command: event => this.openOption(1) },
					{ id: "2", label: "Canciones", icon: "pi pi-angle-double-right", command: event => this.openOption(2) },
					// { id: "3", label: "Instrumentos", icon: "pi pi-angle-double-right", command: event => this.openOption(3) },
					{ id: "4", label: "Recursos", icon: "pi pi-angle-double-right", command: event => this.openOption(4) },
					{ id: "5", label: "Administradores", icon: "pi pi-angle-double-right", command: event => this.openOption(5) }
				]
			}
		];
	}

	openOption(option: number) {
		this.option = option;
	}

	signOff() {
		sessionStorage.clear();
		this.router.navigateByUrl("/login");
	}

	ngOnInit() {}
}
