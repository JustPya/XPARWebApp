import { Instrument } from "./instrument";
import { Resource } from "./resource";

export class Song {
	public _id: string;
	public songName: string;
	public band: string;
	public instruments: Instrument[] = [];
	public resources: Resource[] = [];

	constructor() {
		this._id = null;
		this.songName = null;
		this.band = null;
		this.instruments = [];
		this.resources = [];
	}
}
