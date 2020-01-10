export class Resource {
	public _id: string;
	public name: string;
	public path: string;
	public type: string;
	public description: string;
	public extension: string;

	constructor() {
		this._id = "";
		this.name = "";
		this.path = "";
		this.type = "";
		this.description = "";
		this.extension = "";
	}
}
