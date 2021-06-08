---
title: Fix AWS Amplify for git submodule of public repo
pubDate: 2021-01-09
updDate: 2021-01-09
excerpt: Replace git submodule url with GitHub repo HTTP url.
tags: aws-amplify git-submodule aws git debug
---

# Problem

To get a better preview and take full use of AWS Amplify static file service with Cloudflare CDN,
I use git submodule to connect repo `mylmoe-images` which only stores images, with the main repo `mylmoe`,
To easy access to images in the `mylmoe` project folder.

However, AWS Amplify build failed due to the changes.
The log is:

```log
# Unable to update submodules: Error: Command failed: git submodule update
Cloning into '/codebuild/output/src240106503/src/mylmoe/images'...
Permission denied (publickey).
fatal: Could not read from remote repository.
Please make sure you have the correct access rights
and the repository exists.
fatal: clone of 'git@github.com:myl7/mylmoe-images.git' into submodule path '/codebuild/output/src240106503/src/mylmoe/images' failed
Failed to clone 'images'.
```

We can see the update of the submodule failed due to a public key error.
But the submodule repo `myl7/mylmoe-images` is a public repo!
It seems like a public key config error in AWS Amplify build env.

I have done STFW, but google only gives answers to problems that are about private git submodule on AWS Amplify.

# Analysis

As the problem is caused by the public key error, maybe we can just bypass git url to just use HTTP url.
What we need to do is before the build, update the git submodule remote url to use GitHub repo HTTP url.

The method comes from here:
[How to change the remote repository for a git submodule? - Stack Overflow](https://stackoverflow.com/questions/913701/how-to-change-the-remote-repository-for-a-git-submodule),
which tells that:

- `git submodule init` creates submodule config in `.git/config` from `.gitmodules`;
- `git submodule update` update submodule folder files with remote;
- `git submodule update --init` == `git submodule init && git submodule update`;
- `--remote` in `git submodule update --remote` means only fetch submodule from remote, ignoring local git commit;
- `--recusive` in `git submodule update --recusive` means also perform on nested git submodule in the git submodule, if you have one;
- `git config --file=.gitmodules [key] [vlue]` can update a git config file. git config files like `.gitmodules` / `.git/config` share the same file format;
- `git submodule sync` sync `.gitmodules` with `.git/config` (maybe some other things are also synced). It also accesses `--recursive` option.

# Fix

Make use of the above tips, we can come up with the solution:

```bash
# Fix git submodule for AWS Amplify build
git config --file=.gitmodules submodule.images.url https://github.com/myl7/mylmoe-images
git config --file=.gitmodules submodule.images.branch goshujin-sama
git submodule sync --recursive
git submodule update --init --remote --recursive
```

The script change git submodule url with HTTP url, set up branch name, sync with `.git/config` with `git submodule sync`,
and final update with `git submodule update`.

According to my tests, it can successfully solve the problem of AWS Amplify.
