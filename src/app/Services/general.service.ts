import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Response } from "../Model/response";
import { Authentication } from "../Model/authentication";
import { Band } from "../Model/band";
import { Resource } from "../Model/resource";
import { Song } from "../Model/song";
import { Instrument } from "../Model/instrument";

@Injectable({
	providedIn: "root"
})
export class GeneralService {
	constructor(private http: HttpClient) {}

	loginUser(user: string, password: string): Observable<Response> {
		return this.http.get<Response>(environment.urlLogin + "/" + user + "/" + password);
	}

	getAllBands(): Observable<Response> {
		return this.http.get<Response>(environment.urlGetAllBands);
	}

	updateBand(band: Band): Observable<Response> {
		let body = { name: band.name, description: band.description };
		return this.http.patch<Response>(environment.urlUpdateBand + "/" + band._id, body);
	}

	createBand(band: Band): Observable<Response> {
		let body = { name: band.name, description: band.description };
		return this.http.post<Response>(environment.urlCreateBand, body);
	}

	deleteBand(band: Band): Observable<Response> {
		return this.http.delete<Response>(environment.urlDeleteBand + "/" + band._id);
	}

	//Auth
	getAllAdmins(): Observable<Response> {
		return this.http.get<Response>(environment.urlGetAllAdmin);
	}

	updateAdmin(admin: Authentication): Observable<Response> {
		let body = { username: admin.username };
		return this.http.patch<Response>(environment.urlUpdateAdmin + "/" + admin._id, body);
	}

	createAdmin(admin: Authentication): Observable<Response> {
		let body = { username: admin.username, password: admin.password };
		return this.http.post<Response>(environment.urlCreateAdmin, body);
	}

	deleteAdmin(admin: Authentication): Observable<Response> {
		return this.http.delete<Response>(environment.urlDeleteAdmin + "/" + admin._id);
	}

	//Songs

	getAllSongs(): Observable<Response> {
		return this.http.get<Response>(environment.urlGetAllSongs);
	}

	createSong(song: Song): Observable<Response> {
		let body = { songName: song.songName, band: song.band._id, instruments: song.instruments, resources: song.resources };
		return this.http.post<Response>(environment.urlCreateSong, body);
	}

	updateSong(song: Song): Observable<Response> {
		let body = { songName: song.songName, band: song.band._id, instruments: song.instruments, resources: song.resources };
		return this.http.patch<Response>(environment.urlUpdateSong + "/" + song._id, body);
	}

	deleteSong(song: Song): Observable<Response> {
		return this.http.delete<Response>(environment.urlDeleteSong + "/" + song._id);
	}

	// Resources
	getAllResources(): Observable<Response> {
		return this.http.get<Response>(environment.urlGetAllResources);
	}

	createResource(resource: Resource): Observable<Response> {
		let body = {
			name: resource.name,
			path: resource.path,
			type: resource.type,
			description: resource.description,
			extension: resource.extension
		};
		return this.http.post<Response>(environment.urlCreateResource, body);
	}

	updateResource(resource: Resource): Observable<Response> {
		let body = {
			name: resource.name,
			path: resource.path,
			type: resource.type,
			description: resource.description,
			extension: resource.extension
		};
		return this.http.patch<Response>(environment.urlUpdateSong + "/" + resource._id, body);
	}

	deleteResource(resource: Resource): Observable<Response> {
		return this.http.delete<Response>(environment.urlDeleteResource + "/" + resource._id);
	}

	// Instruments
	getAllInstruments(): Observable<Response> {
		return this.http.get<Response>(environment.urlGetAllInstruments);
	}

	createInstrument(inst: Instrument): Observable<Response> {
		let body = { name: inst.name, resource: inst.resource };
		return this.http.post<Response>(environment.urlCreateInstrument, body);
	}

	updateInstrument(inst: Instrument): Observable<Response> {
		let body = { name: inst.name, resource: inst.resource };
		return this.http.patch<Response>(environment.urlUpdateInstrument + "/" + inst._id, body);
	}

	deleteInstrument(inst: Instrument): Observable<Response> {
		return this.http.delete<Response>(environment.urlDeleteInstrument + "/" + inst._id);
	}
}
