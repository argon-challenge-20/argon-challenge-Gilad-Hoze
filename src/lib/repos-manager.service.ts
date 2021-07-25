import { Octokit } from "@octokit/rest"
import { Octokit as CoreOctokit } from "@octokit/core"
import { apiToken } from "../token"
import { orgType, orgName, setVisibilityHeader } from "../consts"
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
	 * @return The repos data.
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
	 * @param boolean isPrivate Whether the repo is private.
	 */
	async setVisibility(repoName: string, isPrivate: boolean) {
		const visibility = isPrivate ? "private" : "public";
    const response = await octokit.request('PATCH /repos/{owner}/{repo}', {
      headers: {
        accept: setVisibilityHeader,
        },
      owner: orgName,
      repo: repoName,
      visibility: visibility
      });
	}
}

// Exporting an instance for making 1 instance through the project.
module.exports = new ReposManager();