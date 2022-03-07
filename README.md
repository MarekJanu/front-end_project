# Northcoders News

Northcoders News is a social news aggregation, web content rating, and discussion website.

Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article.

This sprint should consolidate your understanding of making a [C.R.U.D](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) application from a front end perspective.

## Kanban

Link to your Trello Board here: https://trello.com/b/wbSooFHD

To keep track of the tasks involved in this project we're going to use a kanban board. Ensure that you work on one ticket at time. You can click on the ticket to find out more information about what is required for the feature. A ticket is not considered complete unless both the happy path and errors response are handled. You can make use of the checklist on each ticket to keep track of the errors you want to handle. You can also make use of error-handling.md to consider the error codes we may wish to respond with.

Please ensure you work through the tickets from top to bottom.

Git Branching and Pull Requests

You will be working on each ticket on a new branch.

To create and switch to a new git branch use the command:

git checkout -b <new branch name>
This will create a branch and move over to that branch. (Omit the -b flag if you wish to switch to an already existing branch).

We recommend that you name the branch the number assigned to each ticket. eg. ncnews-4

When pushing the branch to git hub ensure that you make reference to the branch you are pushing to on the remote.

git push origin <branch name>
From github you can make a pull request and share the link and ticket number on your nchelp. A tutor will swing by to review your code. Ensure that you keep your trello up to date whilst you await the PR approval.

Once a pull request been accepted be sure to switch back to the main branch and pull down the updated changes.

git checkout main

git pull origin main
You can tidy up your local branches once they have been pull into main by deleting them:

git branch -D <local branch>

### Husky

To ensure we are not commiting broken code this project makes use of git hooks. Git hooks are scripts triggered during certain events in the git lifecycle. Husky is a popular package which allows us to set up and maintain these scripts. This project makes use a pre-commit hook. When we attempt to commit our work, the script defined in the pre-commit file will run. If any of our tests fail than the commit will be aborted.

The Husky documentation explains how to configure Husky for your own project as well as creating your own custom hooks._
   
## Important

This sprint is among the ones we'll ask you to complete in order to put you forward for jobs. Put a little bit of love into it! :) <3
