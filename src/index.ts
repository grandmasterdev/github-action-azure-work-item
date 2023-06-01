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
  required: true,
});
const title = getInput("workitem-title", {
  required: true,
});
const description = getInput("workitem-description", {
  required: true,
});
const tag = getInput("workitem-tag", {
  required: false,
});
const area = getInput("workitem-area", {
  required: false,
});
const repoLink = getInput("repo-link", {
  required: false,
});

const run = async () => {
  if (action === "bug") {
    await createBug({
      token: azureDevopsToken,
      organization,
      project,
      title,
      description,
      area,
      repoLink,
      tag,
    });
  }
};

run();
