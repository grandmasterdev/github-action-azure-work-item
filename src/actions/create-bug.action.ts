import * as azdev from "azure-devops-node-api";

const type = "Bug";
const title = "My new bug";
const description = "This is my new bug created using TypeScript.";

export const createBug = async (props: CreateBug) => {
  const { token, project, organization } = props;

  const orgUrl = `https://dev.azure.com/${organization}`;
  const authHandler = azdev.getPersonalAccessTokenHandler(token ?? "");
  const connection = new azdev.WebApi(orgUrl, authHandler);
  const client = await connection.getWorkItemTrackingApi();
  const document = [
    {
      op: "add",
      path: "/fields/System.Title",
      value: title,
    },
    {
      op: "add",
      path: "/fields/System.Description",
      value: description,
    },
    {
      op: "add",
      path: "/fields/System.WorkItemType",
      value: type,
    },
  ];

  try {
    const result = await client.createWorkItem(null, document, project, type);
    console.log(`Bug work item created with ID ${result.id}`);
  } catch (ex) {
    console.error(`[createBug] error`, ex);
    throw ex;
  }
};

export interface CreateBug {
  token: string;
  organization: string;
  project: string;
}
