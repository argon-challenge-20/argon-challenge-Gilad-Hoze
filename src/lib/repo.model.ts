export class Repo {
	name: string;
	url: string;
	private: boolean;
	protected: boolean;

	constructor(name: string, url: string, isPrivate: boolean, isProtected: boolean) {
		this.name = name;
		this.url = url;
		this.private = isPrivate;
		this.protected = isProtected;
	}
}