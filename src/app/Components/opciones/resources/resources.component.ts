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
	public progress: boolean = false;

	constructor(private service: GeneralService, private messageService: MessageService) {
		this.getAllResources();
	}

	getAllResources() {
		this.progress = true;
		this.service.getAllResources().subscribe(
			resp => {
				this.response = resp;
			},
			error => {},
			() => {
				this.progress = false;
				if (this.response.status == "ok") {
					this.resources = this.response.message;
				}
			}
		);
	}

	delete(res: Resource) {
		this.progress = true;
		this.service.deleteResource(res).subscribe(resp => {
			if (resp.status == "ok") {
				this.resources = this.resources.filter(b => b._id != res._id);
				this.messageService.add({
					severity: "success",
					summary: "Recurso eliminado",
					detail: "Recurso eliminado satisfactoriamente."
				});
			}
			this.progress = false;
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
		this.progress = true;
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
				this.progress = false;
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
				this.progress = false;
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
		this.progress = true;
		this.service.uploadVideo(event.files[0]).subscribe(resUpload => {
			if (resUpload.status == "ok") {
				var oldName = event.files[0].name;
				var newName = this.resourceSelected._id + "." + oldName.split(".")[1];
				this.service.updateUpload(oldName.split(".")[0] + ".mp4", newName, "videos").subscribe(resUpdate => {
					if (resUpdate.status == "ok") {
						this.resourceSelected.path = "videos/" + newName;
						this.resourceSelected.type = "Video";
						this.resourceSelected.extension = "." + oldName.split(".")[1];
						this.service.updateResource(this.resourceSelected).subscribe(resUpRe => {
							this.messageService.add({ severity: "success", summary: "Video subido con éxito" });
							this.progress = false;
							this.getAllResources();
						});
					}
					this.progress = false;
				});
			}
			this.progress = false;
		});
	}

	ngOnInit() {}
}
