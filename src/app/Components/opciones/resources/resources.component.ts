import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/Services/general.service";
import { Response } from "src/app/Model/response";
import { Resource } from "src/app/Model/resource";
import { MessageService } from "primeng/api";

@Component({
	selector: "app-resources",
	templateUrl: "./resources.component.html",
	styleUrls: ["./resources.component.scss"],
	providers: [MessageService]
})
export class ResourcesComponent implements OnInit {
	public response: Response;
	public resources: Resource[] = [];
	public resourceSelected: Resource = new Resource();
	public displayModify: boolean = false;
	public displayAddFile: boolean = false;
	public new: boolean = true;

	constructor(private service: GeneralService, private messageService: MessageService) {
		this.getAllResources();
	}

	getAllResources() {
		this.service.getAllResources().subscribe(
			resp => {
				this.response = resp;
			},
			error => {},
			() => {
				console.log(this.response);
				if (this.response.status == "ok") {
					this.resources = this.response.message;
				}
			}
		);
	}

	delete(res: Resource) {
		this.service.deleteResource(res).subscribe(resp => {
			if (resp.status == "ok") {
				this.resources = this.resources.filter(b => b._id != res._id);
				this.messageService.add({
					severity: "success",
					summary: "Recurso eliminado",
					detail: "Recurso eliminado satisfactoriamente."
				});
			}
		});
	}

	modify(res: Resource) {
		this.resourceSelected = res;
		this.displayModify = true;
		this.displayAddFile = false;
		this.new = false;
	}

	modified() {
		if (!this.resourceSelected.name.trim()) {
			this.messageService.add({
				severity: "warn",
				summary: "Nombre de recurso vacío",
				detail: "Por favor verifique este campo."
			});
			return;
		}
		if (!this.resourceSelected.description.trim()) {
			this.messageService.add({
				severity: "warn",
				summary: "Descripción de recurso vacío",
				detail: "Por favor verifique este campo."
			});
			return;
		}
		if (this.new) {
			this.service.createResource(this.resourceSelected).subscribe(resp => {
				if (resp.status == "ok") {
					this.messageService.add({
						severity: "success",
						summary: "Recurso Agregado",
						detail: "Recurso agregado satisfactoriamente."
					});
					this.cancel();
					this.resourceSelected = resp.message;
					this.addFile(this.resourceSelected);
				}
			});
		} else {
			this.service.updateResource(this.resourceSelected).subscribe(resp => {
				if (resp.status == "ok") {
					this.messageService.add({
						severity: "success",
						summary: "Recurso Actualizado",
						detail: "Recurso actualizado satisfactoriamente."
					});
					this.cancel();
				}
			});
		}
	}

	addResource() {
		this.displayModify = true;
		this.displayAddFile = false;
		this.new = true;
		this.resourceSelected = new Resource();
	}

	cancel() {
		this.resourceSelected = new Resource();
		this.displayModify = false;
		this.displayAddFile = false;
		this.new = true;
		this.getAllResources();
	}

	addFile(res: Resource) {
		this.displayAddFile = true;
		this.resourceSelected = res;
  }
  
  onUpload(event, type: string) {
		console.log(event.files);
		this.songSelected.instruments.map(ins => {
			if (ins.name == type) {
				console.log(ins);
				this.service.uploadVideo(event.files[0]).subscribe(res => {
					console.log(res);
					if (res.status == "ok") {
								this.service.updateResource(newRes).subscribe(resUpRe => {
									this.messageService.add({ severity: "success", summary: "Video subido con éxito" });
									console.log(resUpRe);
								});
							}
						});
					}
				});
			}
		});
	}

	ngOnInit() {}
}
