import { Octokit } from "@octokit/rest"
import { apiToken } from "../consts"

const octokit = new Octokit({
  auth: apiToken,
});

export class ReposManager {
	constructor() {}

	/**
	 * Fetch the repos according to the given pararmeters.
	 * @param string orgName The organization name to fetch its repos.
	 * @param string repoType The repo type - public, private, etc...
	 * @return A promise holding the repos data.
	 */
	listRepos(orgName: string, repoType) {
		return octokit.rest.repos.listForOrg({
			org: orgName,
			type: repoType,
		});
	}
}