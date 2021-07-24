# argon-challenge-Gilad-Hoze
## In order to run the server locally, follow the next steps:
- git clone https://github.com/argon-challenge-20/argon-challenge-Gilad-Hoze.git
- npm install
- Locate the token.ts file inside the src directory (contains the secret for the webhooks and the access token)
- npm start

## Run remotely
I used replit.com in order to host my server, the address is: https://argon-challenge-gilad-hoze-1.giladhoze.repl.co/

## API reference
### Listing the current repos (GET)
https://argon-challenge-gilad-hoze-1.giladhoze.repl.co/list_repos

### Protecting/Unprotecting a repo (POST)
https://argon-challenge-gilad-hoze-1.giladhoze.repl.co/set_protection
```json
{
    "repo_name": "repo-1",
    "is_protected": true
}
```

## For checking the challenge requirements, follow the next steps:
### Scenario 1:
- Update a repo to be protected
- Toggle its visibility and see that it wasn't changed

### Scenario 2:
- Update a repo to be unprotected
- Toggle its visibility and see that it was changed
