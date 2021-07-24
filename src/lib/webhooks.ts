var GithubWebHook = require('express-github-webhook');
import { secret } from "../token"

const reposManager = require('./repos-manager.service');
export var webhookHandler = GithubWebHook({ path: '/hook', secret: secret });

// Handle the publicized or privatized event and if the event is on a protected repo
// than it keep the repo's visibility the same.
webhookHandler.on('*', function (event, repo, data) {
  if (data.action == "privatized" || data.action == "publicized") {
    console.log(repo + " was " + data.action);
    const repoIndex = reposManager.orgRepos.findIndex(orgRepo => orgRepo.name === repo);
    if (reposManager.orgRepos[repoIndex].protected) {
      reposManager.setVisibility(repo, reposManager.orgRepos[repoIndex].private)
    } else {
      reposManager.orgRepos[repoIndex].private = data.action == "privatized" ? true : false;
    }
  }
});