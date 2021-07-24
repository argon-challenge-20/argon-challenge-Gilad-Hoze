import { Webhooks } from "@octokit/webhooks"
import { secret } from "../token"

export const webhooks = new Webhooks({
  secret: secret,
});

webhooks.onAny(({ id, name, payload }) => {
  console.log(name, "event received");
});