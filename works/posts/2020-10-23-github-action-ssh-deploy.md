title: Use SSH to deploy in GitHub Action
pubDate: 2020-10-23
updDate: 2020-11-24
excerpt: Do not reinvent the wheel. Use appleboy/ssh-action or appleboy/scp-action.

---

## Where it starts from

CD is delicious, liberating our productivity from worrying about trivial things.
Never NGINX, never ASGI, never daemon, and we can just focus on our code.

Recently I am working on my blog, which is just what you are looking at, and get tired of the `scp` dist folder to the server,
`ssh` logging in, overriding previous files, and opening the browser to see if it works.
After setting up GitHub Action as CI, which is pretty easy, I decided to set up CD too.

## Basic solution on my own

The blog is just a static blog. All I am required to do is to build the emit files and put them on the right paths.
So I decided to use a simple deploy script to complete the tasks.

For safety, I do not want others to get information about my server, so I just pipe the output of the script to `/dev/null`.
I also put the deploy script into the GitHub secrets, and when need it, `echo` it to a file and `bash` it.

Use `scp` to copy files to the server, with `-q` to suppress output.
I put all server-side operations to a script on the server and use `ssh` with `-t` to execute the script as long as SSH is connected.

Then test the script on my development machine, which gives no problems.
Now it is time to commit, push, and see if Github Action feels good.
But what is wired happened: CI/CD gives OK, but the files on my server are not updated.

## Some problems found by myself

### Host

At first, I set the ssh/scp host domain by an abbr defined in my `/etc/hosts`.
I replace it with my blog world-wide domain.
Then I realized that due to Cloudflare CDN, the blog domain can not refer to my server, but Cloudflare CDN server.
So I replace it again with the IP.

### GitHub secrets

Having applied the above fixes, the deployment can still not work fine.
After adding debug output in the GitHub Action, the output is ord but clear: `Bad port '-t'.`
It seems that the GitHub secrets did not become envs in the deploy script directly.
After STFW, I found:
[Accessing your secrets - Encrypted secrets - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#accessing-your-secrets)
[jobs.<job_id>.env - Workflow syntax for GitHub Actions - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsenv),
which are so obvious that I should not ignore them.

### SSH perms

After the above fixes, SSH can still not work fine.
One more STFW, I found some information:
[Self-connecting via SSH on GitHub Actions - Stack Overflow](https://stackoverflow.com/questions/60066477/self-connecting-via-ssh-on-github-actions),
which tells that GitHub Action worker default file system perms can not satisfy SSH requirements.
`chmod go-rw ~` and `-o 'StrictHostKeyChecking no'` are key points.
But this can still not help.

## Use other's wheels

Now I am tired of struggling on GitHub Action SSH too.
This time I take searching to find if there are existing GitHub Action deployment tools.
Then I found appleboy/ssh-action and appleboy/scp-action.
It seems that appleboy/ssh-action has some problems.
I am not so sure -- Use it to `cp` files with overwriting failed.
But appleboy/scp-action works fine.
appleboy/ssh-action has 762 stars and appleboy/ssh-action has 256 stars.
Not great but enough to show that it is a usable tool.

## Review

Now as CD works fine, look at my commit log: it is just ugly.
Lots of meaningless commits are just used to try something in GitHub Action CD.
Just like the time when I learn Docker and try many things in docker build and docker run.
Fortunately, the problem is solved.
A little sad but satisfied.
