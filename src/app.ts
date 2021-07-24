import express from 'express';
import { createNodeMiddleware } from "@octokit/webhooks"

import { ReposManager } from "./lib/repos-manager.service"
import { Repo } from "./lib/repo.model"
import { orgType, serverPort } from "./consts"
import { webhooks } from "./lib/webhooks"

const reposManager = new ReposManager();
const app = express();
const port = serverPort;

app.get('/list_repos', (req, res) => {
  reposManager.listRepos(req.query.org_name.toString(), orgType).then((repos) => {
    const alteredRepos = repos.data.map(repo => new Repo(repo.name, repo.url, repo.private));
    console.log(alteredRepos);
    res.end(JSON.stringify(alteredRepos));
  });
});

app.get('/events', (req, res) => {console.log(req)})

app.listen(port, () => {
  createNodeMiddleware(webhooks);
  return console.log(`server is listening on ${port}`);
});