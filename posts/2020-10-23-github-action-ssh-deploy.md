title: Use SSH script to deploy in GitHub Action
id: 6
---
## Where it starts from

CD is delicious, liberating our productivity from worrying about trivial things.
Never NGINX, never ASGI, never daemon, and we can just focus on our code. 

Recently I am working on my blog, which is just what you are looking at, and be tired of copying dist folder to server,
SSH to login, overriding previous files, and open browsers to see if it works.
After setting up GitHub Action as CI, which is pretty easy, I decided to set up CD too.

## Simple script, safety, and scp/ssh

The blog is just a static blog, all I am required to do is to build the emit files, and put them to the right paths.
So I decided to use a simple deploy script to complete the tasks.

For safety, I do not want others get information of my server, so I just piped the output of the script to `/dev/null`.
I also put the deploy script into the GitHub secrets, and when using, `echo` it to a file and `bash` it.

The core parts are copying and moving files.
`scp` to copy files to the server, with `-q` to suppress output.
I put all server side operations to a script on the server, and used `ssh` with `-t` to execute the script.

Now everything was done.
I wrote a script on my dev computer and ran it.
No problems came out.

## BUGs

### hosts

After pushed them to the repo, the action ran and failed.
After checking log, it is because I used domains in my `/etc/hosts` files to give the server IP.

### Cloudflare CDN

Then I used my blog domain to locate the server, ending up with infinity waiting.
I realized that as I have set up Cloudflare CDN for the domain, the domain can not return the IP of my server.

### No output, exit 0, but failed

Then the action succeeded.
But after I SSH login to the server, to check the modified time of the emit files,
I found that them are not updated.
With no information, I have to remove `&> /dev/null` for deploy script to debug.

The output is ord but clear: Bad port '-t'.
It is that the GitHub secrets did not became envs in the deploy script.
After STFW, I found:
[Accessing your secrets - Encrypted secrets - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#accessing-your-secrets)
[jobs.<job_id>.env - Workflow syntax for GitHub Actions - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsenv).

<del>

### Do not put env in another env

Now the above problems are fixed, but the deploy script can still not do what it can do.
This time I guessed my putting deploy script to an env should be blamed.
After moving the env out of the other env, everything finally, finally works correctly.

I guess this is because GitHub pass the env by `B = "$A"` way.
There may be some doc has talked about this, but I should admit that keeping the envs separated is a good thing.
And as this is a commercial service, I can not get the implementation details.
So I did not think too much about it.

</del>

## SSH perms

After one more careful check, I realized that things have not been done.
Then I found some other information:
[Self-connecting via SSH on GitHub Actions - Stack Overflow](https://stackoverflow.com/questions/60066477/self-connecting-via-ssh-on-github-actions).
`chmod go-rw ~` and `-o 'StrictHostKeyChecking no'` are key points.

Again, it failed, with `lost connection`.
At this point, I have completely lose patient on SSH script deploy.
Webhook now became the new target.

## Review

Now looking at my commit log, it becomes:

```
Fix ssh perm with option.
@myl7
myl7 committed 10 minutes ago X
 
Fix ssh perm in CD.
@myl7
myl7 committed 14 minutes ago X
 
Put deploy script to CD steps.
@myl7
myl7 committed 21 minutes ago X
 
Add new post. Fix parsePosts script.
@myl7
myl7 committed 1 hour ago V
 
Add drafts to ignore.
@myl7
myl7 committed 2 hours ago
 
CI fixed. Now pipe deploy script output to null.
@myl7
myl7 committed 2 hours ago

Move env to file to CD.
@myl7
myl7 committed 1 hour ago V
 
More print for CD debug.
@myl7
myl7 committed 2 hours ago V
 
Allow print debug to debug CD.
@myl7
myl7 committed 3 hours ago V
 
Fix CD to add envs.
@myl7
myl7 committed 3 hours ago V
 
Ignore deploy script.
@myl7
myl7 committed 3 hours ago
 
Update CD.
@myl7
myl7 committed 3 hours ago V
```

Kind of ugly.
Well, I can only take the lesson and avoid this in the future.
