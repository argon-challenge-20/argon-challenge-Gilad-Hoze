import express from 'express';
import * as bodyParser from "body-parser"

import { ReposManager } from "./lib/repos-manager.service"
import { serverPort } from "./consts"
import { webhookHandler } from "./lib/webhooks"

const reposManager = new ReposManager();
const app = express();
const port = serverPort;

app.use(bodyParser.json());
app.use(webhookHandler);

// An API for protecting a single repo.
app.post('/set_protection', (req, res) => {
  const repoName = req.body.repo_name;
  const isProtected = req.body.is_protected;
  const repoIndex = reposManager.orgRepos.findIndex(repo => repo.name === repoName);
  if (repoIndex !== -1) {
    reposManager.orgRepos[repoIndex].protected = isProtected;
    res.send("Repo " + repoName + " is protected: " + isProtected)
  } else {
    res.send("Repo " + repoName + " doesn't exist")
  }
});


// An API for listing all the repos of the organization
app.get('/list_repos', (req, res) => {
  res.end(JSON.stringify(reposManager.orgRepos));
});


// Starting the app and fetching all the organziation repos.
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});