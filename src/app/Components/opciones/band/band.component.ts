import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/Services/general.service";
import { Response } from "src/app/Model/response";
import { ConfirmationService, MessageService } from "primeng/api";
import { Band } from "src/app/Model/band";

@Component({
	selector: "app-band",
	templateUrl: "./band.component.html",
	styleUrls: ["./band.component.scss"],
	providers: [ConfirmationService, MessageService]
})
export class BandComponent implements OnInit {
	public response: Response;
	public bands: Band[] = [];
	public displayModify: boolean = false;
	public bandSelected: Band = new Band();
	public new: boolean = true;
	public progress: boolean = false;

	constructor(
		private service: GeneralService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService
	) {
		this.getAllBands();
	}

	getAllBands() {
		this.progress = true;
		this.service.getAllBands().subscribe(
			response => {
				this.response = response;
			},
			error => {},
			() => {
				if (this.response.status == "ok") {
					this.bands = this.response.message;
				}
				this.progress = false;
			}
		);
	}

	modify(banda: Band) {
		this.bandSelected = banda;
		this.displayModify = true;
		this.new = false;
	}

	delete(band: Band) {
		this.bandSelected = band;
		this.confirmationService.confirm({
			message: "¿Está seguro que desea eliminar esta banda?",
			header: "Eliminar",
			acceptLabel: "Si",
			rejectLabel: "No",
			accept: () => {
				this.progress = true;
				this.service.deleteBand(this.bandSelected).subscribe(response => {
					if (response.status == "ok") {
						this.messageService.add({
							severity: "success",
							summary: "Banda eliminada",
							detail: "Banda eliminada satisfactoriamente."
						});
						this.bands = this.bands.filter(b => b._id != this.bandSelected._id);
					}
					this.progress = false;
					this.bandSelected = new Band();
				});
			}
		});
	}

	modified() {
		if (!this.bandSelected.name.trim()) {
			this.messageService.add({
				severity: "warn",
				summary: "Nombre vacío",
				detail: "El nombre de la banda no puede ser vacío."
			});
			return;
		}
		if (!this.bandSelected.description.trim()) {
			this.messageService.add({
				severity: "warn",
				summary: "Descripción vacía",
				detail: "La descripción de la banda no puede ser vacía."
			});
			return;
		}
		this.displayModify = false;
		this.progress = true;
		if (!this.new) {
			this.service.updateBand(this.bandSelected).subscribe(response => {
				if (response.status == "ok") {
					this.messageService.add({
						severity: "success",
						summary: "Banda actualizada",
						detail: "Banda actualizada satisfactoriamente."
					});
				}
				this.progress = false;
			});
		} else {
			this.service.createBand(this.bandSelected).subscribe(response => {
				if (response.status == "ok") {
					this.messageService.add({
						severity: "success",
						summary: "Banda agregada",
						detail: "Banda agregada satisfactoriamente."
					});
					this.getAllBands();
				}
				this.progress = false;
			});
		}
		this.bandSelected = new Band();
	}

	cancelar() {
		this.displayModify = false;
		this.bandSelected = new Band();
		this.getAllBands();
	}

	addBand() {
		this.displayModify = true;
		this.new = true;
	}

	ngOnInit() {}
}
