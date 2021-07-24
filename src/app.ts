import express from 'express';
import * as bodyParser from "body-parser"

import { ReposManager } from "./lib/repos-manager.service"
import { Repo } from "./lib/repo.model"
import { orgType, serverPort } from "./consts"
import { webhookHandler } from "./lib/webhooks"

const reposManager = new ReposManager();
const app = express();
app.use(bodyParser.json());
app.use(webhookHandler);
const port = serverPort;

app.get('/list_repos', (req, res) => {
  reposManager.listRepos(req.query.org_name.toString(), orgType).then((repos) => {
    const alteredRepos = repos.data.map(repo => new Repo(repo.name, repo.url, repo.private));
    console.log(alteredRepos);
    res.end(JSON.stringify(alteredRepos));
  });
});


app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});