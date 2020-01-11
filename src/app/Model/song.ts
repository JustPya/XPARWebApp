import { Resource } from "./resource";
import { Instrument } from "./instrument";
import { Band } from "./band";

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
