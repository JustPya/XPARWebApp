import { Resource } from "./resource";

export class Instrument {
	public _id: string;
	public name: string;
	public resource: Resource;

	constructor() {
		this._id = "";
		this.name = "";
		this.resource = new Resource();
	}
}
