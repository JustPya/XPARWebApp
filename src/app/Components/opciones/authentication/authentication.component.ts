import { Component, OnInit } from "@angular/core";
import { Authentication } from "src/app/Model/authentication";
import { Response } from "src/app/Model/response";
import { GeneralService } from "src/app/Services/general.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
	selector: "app-authentication",
	templateUrl: "./authentication.component.html",
	styleUrls: ["./authentication.component.scss"],
	providers: [ConfirmationService, MessageService]
})
export class AuthenticationComponent implements OnInit {
	public response: Response;
	public admins: Authentication[] = [];
	public adminSelected: Authentication = new Authentication();
	public displayModify: boolean = false;
	public new: boolean = true;
	public progress: boolean = false;

	constructor(
		private service: GeneralService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService
	) {
		this.getAllAdmins();
	}

	getAllAdmins() {
		this.progress = true;
		this.service.getAllAdmins().subscribe(
			response => {
				this.response = response;
			},
			error => {},
			() => {
				if (this.response.status == "ok") {
					this.admins = this.response.message;
				}
				this.progress = false;
			}
		);
	}

	modify(admin: Authentication) {
		this.adminSelected = admin;
		this.displayModify = true;
		this.new = false;
	}

	modified() {
		if (!this.adminSelected.username.trim()) {
			this.messageService.add({
				severity: "warn",
				summary: "Nombre de usuario vacío",
				detail: "El nombre de usuario no pueder estar vacío."
			});
			return;
		}
		if (!this.adminSelected.password.trim()) {
			this.messageService.add({ severity: "warn", summary: "Contraseña vacía", detail: "La contraseña no pueder estar vacía." });
			return;
		}

		this.displayModify = false;
		this.progress = true;
		if (!this.new) {
			this.service.updateAdmin(this.adminSelected).subscribe(response => {
				if (response.status == "ok") {
					this.messageService.add({
						severity: "success",
						summary: "Administrador agregado",
						detail: "Agregado satisfactoriamente."
					});
					this.adminSelected = new Authentication();
				}
				this.progress = false;
			});
		} else {
			this.service.createAdmin(this.adminSelected).subscribe(response => {
				if (response.status == "ok") {
					this.messageService.add({
						severity: "success",
						summary: "Administrador actualizado",
						detail: "Actualizado satisfactoriamente."
					});
					this.getAllAdmins();
				}
				this.progress = false;
			});
		}
	}

	delete(admin: Authentication) {
		this.adminSelected = admin;
		this.confirmationService.confirm({
			message: "¿Está seguro que desea eliminar esta Administrador?",
			header: "Eliminar",
			acceptLabel: "Si",
			rejectLabel: "No",
			accept: () => {
				this.progress = true;
				this.service.deleteAdmin(this.adminSelected).subscribe(response => {
					if (response.status == "ok") {
						this.messageService.add({
							severity: "success",
							summary: "Administrador eliminado",
							detail: "Eliminado satisfactoriamente."
						});
						this.admins = this.admins.filter(b => b._id != this.adminSelected._id);
					}
					this.progress = false;
					this.adminSelected = new Authentication();
				});
			}
		});
	}

	cancelar() {
		this.displayModify = false;
		this.adminSelected = new Authentication();
		this.getAllAdmins();
	}

	addAdmin() {
		this.displayModify = true;
		this.new = true;
	}

	ngOnInit() {}
}
