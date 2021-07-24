import { Webhooks } from "@octokit/webhooks"
import { secret } from "../token"

export const webhooks = new Webhooks({
  secret: secret,
});

webhooks.onAny((event) => console.log(event));