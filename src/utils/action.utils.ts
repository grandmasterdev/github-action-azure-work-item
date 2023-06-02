import { getInput } from "@actions/core";

const label = getInput("label", {
  required: false,
});
const action = getInput("action", {
  required: true,
});

export const getAction = () => {
  if (label) {
    if (label === "bug") {
      return "bug";
    }
  }

  return action;
};
