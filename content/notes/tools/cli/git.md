---
title: git
layout: page
---
### Pretty logging

```
git log --oneline --decorate --graph --all
```

```
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all
```

### fast forward only

```
git pull --ff-only
```

### Special gitconfig if under some folder

```
[includeIf "gitdir:~/some-folder/"]
    path = ~/some-folder/.gitconfig
```

### diff against latest stash

```
git stash show -p
```

### Fetch a different branch

General syntax:
```
git fetch <remote> <src>:<dst>
```

For instance:
```
git fetch origin main:main
```

### Other

[Amend specific commit](https://stackoverflow.com/a/1186549/212069)

[Revert multiple commits in one commit](https://stackoverflow.com/a/1470452/212069)
