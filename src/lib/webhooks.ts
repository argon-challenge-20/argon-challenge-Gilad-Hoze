var GithubWebHook = require('express-github-webhook');

import { secret } from "../token"


export var webhookHandler = GithubWebHook({ path: '/hook', secret: secret });

webhookHandler.on('*', function (event, repo, data) {
  console.log(event);
  console.log(repo);
  console.log(data);
});