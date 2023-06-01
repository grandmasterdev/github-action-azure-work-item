import * as azdev from "azure-devops-node-api";
import * as wit from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";

const type = "Bug";

export const createBug = async (props: CreateBug) => {
  const { token, project, organization, title, description } = props;

  const orgUrl = `https://dev.azure.com/${organization}`;
  const authHandler = azdev.getPersonalAccessTokenHandler(token ?? "");
  const connection = new azdev.WebApi(orgUrl, authHandler);
  console.log(`connection az: ${JSON.stringify(connection)}`);
  const client = await connection.getWorkItemTrackingApi();
  console.log(`client connection az: ${JSON.stringify(client)}`);
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
    //   {
    //     op: "add",
    //     path: "/fields/System.WorkItemType",
    //     value: type,
    //   },
  ];

  try {
    const result = await client.createWorkItem(null, document, project, type);
    //const result = await client.createWorkItem(null, document, project, type);
    console.log(`[createBug] Response from client, ${JSON.stringify(result)}`);
    //console.log(`Bug work item created with ID ${result.id}`);
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
}
