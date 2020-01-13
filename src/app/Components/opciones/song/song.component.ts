import { Component, OnInit } from "@angular/core";
import { Song } from "src/app/Model/song";
import { GeneralService } from "src/app/Services/general.service";
import { Response } from "src/app/Model/response";
import { ConfirmationService } from "primeng/api";
import { Band } from "src/app/Model/band";
import { Resource } from "src/app/Model/resource";
import { Instrument } from "src/app/Model/instrument";

@Component({
	selector: "app-song",
	templateUrl: "./song.component.html",
	styleUrls: ["./song.component.scss"],
	providers: [ConfirmationService]
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

	constructor(private service: GeneralService, private confirmationService: ConfirmationService) {
		this.getAllSongs();
		this.getAllBands();
	}

	getAllSongs() {
		this.service.getAllSongs().subscribe(
			response => {
				this.response = response;
			},
			error => {
				console.error("Error in getAllSongs()", error);
			},
			() => {
				if ((this.response.status = "ok")) {
					this.songs = this.response.message;
					console.log(this.response.message);
					console.log(this.songs);
				}
			}
		);
	}

	getAllBands() {
		this.service.getAllBands().subscribe(
			response => {
				this.response = response;
			},
			error => {
				console.error("Error getAllBands", error);
			},
			() => {
				if (this.response.status == "ok") {
					this.bands = this.response.message;
				}
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
			console.log("No selecciono banda");
			return;
		}
		if (this.songSelected.songName == "") {
			console.log("No selecciono nombre de cancion");
			return;
		}
		if (this.new) {
			this.service.createSong(this.songSelected).subscribe(
				response => {
					this.response = response;
				},
				error => {},
				() => {
					console.log(this.response);
					if (this.response.status == "ok") {
						this.songSelected = this.response.message;
						this.displayAdd = false;
						this.displayInst = true;
					}
				}
			);
		} else {
			this.displayAdd = false;
			this.displayInst = true;
			console.log("hacer update", this.songSelected);
			this.verificarInstrumentos();
		}
	}

	continuarReso() {
		console.log(this.instrumentos);
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
								this.service.updateSong(this.songSelected).subscribe(resSong => {});
							}
						});
					}
				});
			}
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
		if (!this.new) {
			this.service.updateSong(this.songSelected).subscribe(response => {
				console.log(response);
			});
		} else {
			this.service.createSong(this.songSelected).subscribe(response => {
				if (response.status == "ok") {
					this.getAllSongs();
				}
			});
			console.log("Added", this.songSelected);
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
				this.service.deleteSong(this.songSelected).subscribe(response => {
					if (response.status == "ok") {
						this.songs = this.songs.filter(b => b._id != this.songSelected._id);
					}
					console.log(response);
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
		console.log(event.files);
		this.songSelected.instruments.map(ins => {
			if (ins.name == type) {
				console.log(ins);
				this.service.uploadVideo(event.files[0]).subscribe(res => {
					console.log(res);
					if (res.status == "ok") {
						var oldName = event.files[0].name;
						var newName = ins.resource + "." + oldName.split(".")[1];
						console.log(oldName);
						this.service.updateUpload(oldName.split(".")[0] + ".mp4", newName, "videos").subscribe(resUpd => {
							if (resUpd.status == "ok") {
								console.log(resUpd);
								var newRes = new Resource();
								newRes._id = ins.resource;
								newRes.name = ins.name;
								newRes.path = "videos/" + newName;
								newRes.type = "Video";
								newRes.description = "Video from " + this.songSelected.songName + "' " + ins.name;
								newRes.extension = oldName.split(".")[1];
								console.log(newRes);
								this.service.updateResource(newRes).subscribe(resUpRe => {
									console.log(resUpRe);
								});
								this.songSelected.resources.push(newRes);
								this.service.updateSong(this.songSelected).subscribe(resUpSo => {
									console.log(resUpSo);
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
