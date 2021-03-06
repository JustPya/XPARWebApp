import { Resource } from "./resource";

export class Band {
	public _id: string;
	public name: string;
	public description: string;
	public resources: Resource[] = [];

	constructor() {
		this._id = null;
		this.name = null;
		this.description = null;
		this.resources = [];
	}
}
