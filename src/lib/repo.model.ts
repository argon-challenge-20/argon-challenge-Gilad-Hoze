export class Repo {
	name: string;
	url: string;
	private: boolean;

	constructor(name: string, url: string, isPrivate: boolean) {
		this.name = name;
		this.url = url;
		this.private = isPrivate;
	}
}