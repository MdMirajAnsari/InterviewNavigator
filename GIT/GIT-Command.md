git commit -am "message"

## The Clean All (discard all changes)

`git clean -fd`

## How do you move a commit to the staging area in git?

`git reset --soft HEAD~1`

## Pushing empty commits to remote

`git commit --allow-empty -m "Trigger Build"`

---

Add existing repo
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push --set-upstream origin master
git pull origin master --allow-unrelated-histories
git merge origin/master

## History

git log --graph --color --decorate --oneline --all

gitk --all

## Git to discard uncommitted changes in your working directory

```
git restore .

```

## Moves the last commit back to the staging area (index), keeping all changes.

```
git reset --soft HEAD~

```

## Moves the last commit back to the staging area (index), Discard all changes.

```
git reset --hard HEAD~
```

## Deletes a local branch named branch_name.

```
git branch -d branch_name

```

## Force Delete a Branch (If Not Merged):

```
git branch -D branch_name

```

## Delete a Remote Branch:

```
git push origin --delete branch_name

```

## List both local & remote branches:

```
git branch -a

```

## Prunes (removes) local references to remote branches that no longer exist on the remote.

```
git fetch --prune

```

## Quickly Switch to the Previous Branch

```
git checkout -
```

## Show a Visual Branch Tree

```
git log --oneline --graph --all
```

## Search Commit Messages

```
git log --grep="bugfix"
```

## Configures Git to use Windows' built-in SSL/TLS (Schannel) instead of OpenSSL

```
git config --global https.sslBackend schannel
```

## Trigger the CI/CD pipeline with a blank commit

```
git commit --allow-empty -m 'Empty commit'
```

## Adding a Git subtree to your repository

```
git remote add -f eCommerceSolution.OrdersService https://github.com/mirajhad/eCommerceSolution.OrdersService.git
git subtree add --prefix=eCommerceSolution.OrdersService eCommerceSolution.OrdersService main --squash

```

## visualizing Git history

```
gitk
```

## correct way to add a remote Bitbucket repository to your local Git repository:


```bash
git remote add origin https://mirajhad@bitbucket.org/cottonmouth/deal-app.git
```

```bash
git push -u origin main
```

if got some error

```bash
git pull origin main --allow-unrelated-histories
```
