# Azure Work Item

Creates work item like User Stories or Bugs in Azure Devops. It will automatically creates
them when an issue is created as an example in your git repo.

## How to use?

This action requires that you ran it on `nodejs` supported machines (eg `ubuntu-latest` or `windows-latest`)

### Setting the trigger

```yaml
on:
  issues:
    types: [opened]
```

### Setting the jobs and steps

```yaml
jobs:
  get-branch:
    runs-on: ubuntu-latest

    steps:
      - uses: grandmasterdev/github-action-azure-work-item@master
        with:
          action: "bug"
          organization: "My-Organization"
          project: "My-Project"
          azure-devops-token: "${{secrets.PAT}}"
          workitem-title: "${{github.event.issue.title}}"
          workitem-description: "${{github.event.issue.body}}"
          workitem-area: 'My-Project\My Area'
          workitem-tag: "tag1-value"
          repo-link: "${{github.event.issue.html_url}}"
```

Supported `action` inputs are as follows:

1. bug
2. epic
3. feature
4. task

### The full example

```yaml
name: issue-workflow

on:
  issues:
    types: [opened]

jobs:
  get-branch:
    runs-on: ubuntu-latest

    steps:
      - uses: grandmasterdev/github-action-azure-work-item@master
        with:
          action: "bug"
          organization: "My-Organization"
          project: "My-Project"
          azure-devops-token: "${{secrets.PAT}}"
          workitem-title: "${{github.event.issue.title}}"
          workitem-description: "${{github.event.issue.body}}"
          workitem-area: 'My-Project\My Area'
          workitem-tag: "tag1-value"
          repo-link: "${{github.event.issue.html_url}}"
```
