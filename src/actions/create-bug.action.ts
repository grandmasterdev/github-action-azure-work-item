import { setOutput } from "@actions/core";
import * as azdev from "azure-devops-node-api";

const type = "Bug";

export const createBug = async (props: CreateBug) => {
  const {
    token,
    project,
    organization,
    title,
    description,
    area,
    repoLink,
    tag,
  } = props;

  const orgUrl = `https://dev.azure.com/${organization}`;
  const authHandler = azdev.getPersonalAccessTokenHandler(token ?? "");
  const connection = new azdev.WebApi(orgUrl, authHandler);
  const client = await connection.getWorkItemTrackingApi();

  const document = [
    {
      op: "add",
      path: "/fields/System.Title",
      value: title,
      from: null,
    },
    {
      op: "add",
      path: "/fields/System.Description",
      value: description,
      from: null,
    },
    {
      op: "add",
      path: "/fields/System.AreaPath",
      value: area ?? "",
    },
    {
      op: "add",
      path: "/fields/System.Tags",
      value: tag ?? "",
    },
    {
      op: "add",
      path: "/fields/Microsoft.VSTS.TCM.ReproSteps",
      value: repoLink ?? "",
    },
    {
      op: "add",
      path: "/fields/Microsoft.VSTS.TCM.SystemInfo",
      value: description ?? "",
    },
  ];

  try {
    const result = await client.createWorkItem(null, document, project, type);

    console.log(`Bug work item created with ID ${result.id}`);

    setOutput("id", result.id);
  } catch (ex) {
    console.error(`[createBug] error`, ex);
    throw ex;
  }
};

export interface CreateBug {
  token: string;
  organization: string;
  project: string;
  title: string;
  description: string;
  area?: string;
  repoLink?: string;
  tag?: string;
}
