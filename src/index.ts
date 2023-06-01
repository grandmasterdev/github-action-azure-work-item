import { getInput } from "@actions/core";
import { createBug } from "./actions/create-bug.action";

const action = getInput("action", {
  required: true,
});
const azureDevopsToken = getInput("azure-devops-token", {
  required: true,
});
const organization = getInput("organization", {
  required: true,
});
const project = getInput("project", {
    required: true
})

const run = async () => {
  if (action === "bug") {
    await createBug({
        token: azureDevopsToken,
        organization
    });
  }
};

run();
