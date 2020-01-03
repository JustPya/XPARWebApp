import { Component, OnInit } from "@angular/core";
import { Song } from "src/app/Model/song";
import { GeneralService } from "src/app/Services/general.service";
import { Response } from "src/app/Model/response";
import { ConfirmationService } from "primeng/api";
import { Band } from "src/app/Model/band";

@Component({
	selector: "app-song",
	templateUrl: "./song.component.html",
	styleUrls: ["./song.component.scss"],
	providers: [ConfirmationService]
})
export class SongComponent implements OnInit {
	public songs: Song[] = [];
	public response: Response;
	public songSelected: Song = new Song();
	public bands: Band[] = [];

	public displayAdd: boolean = false;
	public displayInst: boolean = false;
	public displayReso: boolean = false;

	public new: boolean = true;
	public instrumentos = {
		voz: false,
		guitarra: false,
		bajo: false,
		bateria: false
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

	continuarIns() {
		this.displayAdd = false;
		this.displayInst = true;
	}

	continuarReso() {
		console.log(this.instrumentos);
		this.displayInst = false;
		this.displayReso = true;
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
				});
			}
		});
	}

	addSong() {
		this.displayAdd = true;
		this.new = true;
	}

	ngOnInit() {}
}
