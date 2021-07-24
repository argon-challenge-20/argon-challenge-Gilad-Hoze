import { Octokit } from "@octokit/rest"
import { Octokit as CoreOctokit } from "@octokit/core"
import { apiToken } from "../token"
import { orgType, orgName } from "../consts"
import { Repo } from "./repo.model"

const octokit = new Octokit({
  auth: apiToken,
});

class ReposManager {
	public orgRepos;

	/**
	 * Initializing the repos.
	 */
	constructor() {
    this.listRepos(orgName, orgType).then((repos) => {
			this.orgRepos = repos.data.map(repo => new Repo(repo.name, repo.url, repo.private, false));
		});
  }

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

	/**
	 * Set the visiblity of the given repo according to the given isPrivate parameter.
	 * @param string repoName The repo's name.
	 * @param boolean isPrivate Wether the repo is private.
	 */
	setVisibility(repoName: string, isPrivate: boolean) {
		const visibility = isPrivate ? "private" : "public";
		octokit.request('PATCH /repos/{owner}/{repo}', {
			  owner: orgName,
			  repo: repoName,
			  visibility: visibility
			}).then((data) => console.log(data));
	}
}
module.exports = new ReposManager();