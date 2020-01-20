import { Component, OnInit } from "@angular/core";
import { Song } from "src/app/Model/song";
import { GeneralService } from "src/app/Services/general.service";
import { Response } from "src/app/Model/response";
import { ConfirmationService, MessageService } from "primeng/api";
import { Band } from "src/app/Model/band";
import { Resource } from "src/app/Model/resource";
import { Instrument } from "src/app/Model/instrument";

@Component({
	selector: "app-song",
	templateUrl: "./song.component.html",
	styleUrls: ["./song.component.scss"],
	providers: [ConfirmationService, MessageService]
})
export class SongComponent implements OnInit {
	public response: Response;
	public songs: Song[] = [];
	public songSelected: Song = new Song();
	public bands: Band[] = [];
	public bandSelected: Band = new Band();

	public displayAdd: boolean = false;
	public displayInst: boolean = false;
	public displayReso: boolean = false;

	public new: boolean = true;
	public instrumentos = {
		Voice: false,
		Guitar: false,
		Bass: false,
		Drums: false
	};

	public instrumentosClick = {
		Voice: false,
		Guitar: false,
		Bass: false,
		Drums: false
	};
	public progress: boolean = false;

	constructor(
		private service: GeneralService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService
	) {
		this.getAllSongs();
		this.getAllBands();
	}

	getAllSongs() {
		this.progress = true;
		this.service.getAllSongs().subscribe(
			response => {
				this.response = response;
			},
			error => {},
			() => {
				if ((this.response.status = "ok")) {
					this.songs = this.response.message;
				}
				this.progress = false;
			}
		);
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

	modify(song: Song) {
		this.songSelected = song;
		this.displayAdd = true;
		this.new = false;
	}

	selectBand() {
		this.songSelected.band = this.bandSelected._id;
	}

	continuarIns() {
		if (this.songSelected.band == "") {
			this.messageService.add({
				severity: "warn",
				summary: "Nombre de banda vacío",
				detail: "Por favor verifique este campo."
			});
			return;
		}
		if (this.songSelected.songName == "") {
			this.messageService.add({
				severity: "warn",
				summary: "Nombre de canción vacío",
				detail: "Por favor verifique este campo."
			});
			return;
		}
		if (this.new) {
			this.progress = true;
			this.service.createSong(this.songSelected).subscribe(
				response => {
					this.response = response;
				},
				error => {},
				() => {
					if (this.response.status == "ok") {
						this.songSelected = this.response.message;
						this.displayAdd = false;
						this.displayInst = true;
						this.messageService.add({
							severity: "warn",
							summary: "Canción creada con éxito"
						});
					}
					this.progress = false;
				}
			);
		} else {
			this.displayAdd = false;
			this.displayInst = true;
			this.progress = true;
			this.service.updateSong(this.songSelected).subscribe(resUpSo => {
				this.messageService.add({
					severity: "warn",
					summary: "Canción actualizada satisfactoriamente"
				});
				this.progress = false;
			});
			this.verificarInstrumentos();
		}
	}

	continuarReso() {
		if (this.instrumentosClick.Voice && this.instrumentos.Voice) {
			this.createInsAndReso("Voice");
		}
		if (this.instrumentosClick.Guitar && this.instrumentos.Guitar) {
			this.createInsAndReso("Guitar");
		}
		if (this.instrumentosClick.Bass && this.instrumentos.Bass) {
			this.createInsAndReso("Bass");
		}
		if (this.instrumentosClick.Drums && this.instrumentos.Drums) {
			this.createInsAndReso("Drums");
		}
		this.displayInst = false;
		this.displayReso = true;
	}

	createInsAndReso(nameIns: string) {
		this.progress = true;
		var newResource = new Resource();
		var newInstrument = new Instrument();
		newResource.name = nameIns;
		newInstrument.name = newResource.name;
		this.service.createInstrument(newInstrument).subscribe(resCIns => {
			if ((resCIns.status = "ok")) {
				newInstrument = resCIns.message;
				this.service.createResource(newResource).subscribe(resCRes => {
					if ((resCRes.status = "ok")) {
						newResource = resCRes.message;
						newInstrument.resource = newResource._id;
						this.service.updateInstrument(newInstrument).subscribe(resUIns => {
							if ((resUIns.status = "ok")) {
								newInstrument = resUIns.message;
								this.songSelected.instruments.push(newInstrument);
								this.service.updateSong(this.songSelected).subscribe(resSong => {
									this.progress = false;
								});
							}
							this.progress = false;
						});
					}
					this.progress = false;
				});
			}
			this.progress = false;
		});
	}

	verificarInstrumentos() {
		for (const ins of this.songSelected.instruments) {
			switch (ins.name) {
				case "Voice":
					this.instrumentos.Voice = true;
					break;
				case "Guitar":
					this.instrumentos.Guitar = true;
					break;
				case "Bass":
					this.instrumentos.Bass = true;
					break;
				case "Drums":
					this.instrumentos.Drums = true;
					break;
			}
		}
	}

	selectIns(inst: string) {
		switch (inst) {
			case "voice":
				this.instrumentos.Voice = !this.instrumentos.Voice;
				this.instrumentosClick.Voice = !this.instrumentosClick.Voice;
				break;
			case "guitar":
				this.instrumentos.Guitar = !this.instrumentos.Guitar;
				this.instrumentosClick.Guitar = !this.instrumentosClick.Guitar;
				break;
			case "bass":
				this.instrumentos.Bass = !this.instrumentos.Bass;
				this.instrumentosClick.Bass = !this.instrumentosClick.Bass;
				break;
			case "drums":
				this.instrumentos.Drums = !this.instrumentos.Drums;
				this.instrumentosClick.Drums = !this.instrumentosClick.Drums;
				break;

			default:
				break;
		}
	}

	modified() {
		this.displayAdd = false;
		this.progress = true;
		if (!this.new) {
			this.service.updateSong(this.songSelected).subscribe(response => {
				this.progress = false;
			});
		} else {
			this.service.createSong(this.songSelected).subscribe(response => {
				if (response.status == "ok") {
					this.getAllSongs();
				}
				this.progress = false;
			});
		}
	}

	delete(song: Song) {
		this.songSelected = song;
		this.confirmationService.confirm({
			message: "¿Está seguro que desea eliminar esta Canción?",
			header: "Eliminar",
			acceptLabel: "Si",
			rejectLabel: "No",
			accept: () => {
				this.progress = true;
				this.service.deleteSong(this.songSelected).subscribe(response => {
					if (response.status == "ok") {
						this.songs = this.songs.filter(b => b._id != this.songSelected._id);
					}
					this.progress = false;
					this.songSelected = new Song();
					this.bandSelected = new Band();
				});
			}
		});
	}

	cancelar() {
		this.displayAdd = false;
		this.displayInst = false;
		this.displayReso = false;
		this.songSelected = new Song();
		this.bandSelected = new Band();
		this.instrumentos.Voice = false;
		this.instrumentos.Guitar = false;
		this.instrumentos.Bass = false;
		this.instrumentos.Drums = false;
		this.instrumentosClick.Voice = false;
		this.instrumentosClick.Guitar = false;
		this.instrumentosClick.Bass = false;
		this.instrumentosClick.Drums = false;
		this.getAllSongs();
	}

	addSong() {
		this.displayAdd = true;
		this.new = true;
	}

	onUpload(event, type: string) {
		this.progress = true;
		this.songSelected.instruments.map(ins => {
			if (ins.name == type) {
				this.service.uploadVideo(event.files[0]).subscribe(res => {
					if (res.status == "ok") {
						var oldName = event.files[0].name;
						var newName = ins.resource + "." + oldName.split(".")[1];
						this.service.updateUpload(oldName.split(".")[0] + ".mp4", newName, "videos").subscribe(resUpd => {
							if (resUpd.status == "ok") {
								var newRes = new Resource();
								newRes._id = ins.resource;
								newRes.name = ins.name;
								newRes.path = "videos/" + newName;
								newRes.type = "Video";
								newRes.description = "Video from " + this.songSelected.songName + "' " + ins.name;
								newRes.extension = oldName.split(".")[1];
								this.service.updateResource(newRes).subscribe(resUpRe => {
									this.messageService.add({ severity: "success", summary: "Video subido con éxito" });
									this.progress = false;
								});
								this.songSelected.resources.push(newRes);
								this.service.updateSong(this.songSelected).subscribe(resUpSo => {
									this.messageService.add({ severity: "success", summary: "Canción actualizada satisfactoriamente." });
									this.progress = false;
								});
							}
							this.progress = false;
						});
					}
					this.progress = false;
				});
			}
		});
	}

	ngOnInit() {}
}
