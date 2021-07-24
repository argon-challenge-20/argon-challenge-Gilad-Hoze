import { Webhooks } from "@octokit/webhooks"
import { secret } from "../consts"

export const webhooks = new Webhooks({
  secret: secret,
});

webhooks.onAny((event) => console.log(event));