import { Resource } from "./resource";
import { Instrument } from "./instrument";
import { Band } from "./band";

export class Song {
	public _id: string;
	public songName: string;
	public band: Band;
	public instruments: Instrument[] = [];
	public resources: Resource[] = [];

	constructor() {
		this._id = null;
		this.songName = "";
		this.band = new Band();
		this.instruments = [];
		this.resources = [];
	}
}
