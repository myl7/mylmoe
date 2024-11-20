---
date:
  created: 2024-11-20
---

# Install Poetry in Vercel Builds

<!-- more -->

## Problem

[Poetry](https://python-poetry.org/) is a Python dependency management tool.
It writes the dependencies with their version constraints to standardized `pyproject.toml` and pins their exact versions to lock file `poetry.lock`, which works like npm.

[Vercel](https://vercel.com) is a platform to build and deploy web apps.
It provides continuous integration and delivery ([CI](https://en.wikipedia.org/wiki/Continuous_integration) and [CD](https://en.wikipedia.org/wiki/Continuous_delivery)) for GitHub projects, which pulls, builds, and deploys a project automatically after each push.
During a Vercel build for the project, Vercel runs the install and build commands in a [build image](https://vercel.com/docs/deployments/build-image/build-image).
After the build, an output directory is served as a static website by Vercel.
Vercel can also deploy dynamic websites, but this is not the focus of this post.

To install Poetry in Vercel Builds, which are CI environments, [Poetry's doc](https://python-poetry.org/docs/#ci-recommendations) recommends **pipx** or **pip** to install an exact version of Poetry.
Vercel's build image is based on Amazon Linux 2023, which is minimized to reduce its size.
While pip is available in the build image as `pyhton3 -m pip` (`python`/`pip`/`pip3` commands are not), pipx needs installation described in [pipx's doc](https://github.com/pypa/pipx?tab=readme-ov-file#on-linux).
Both methods encounter problems.

??? note "Poetry's exact version"

    Except for specifying the version in the installation command, the version is also available in the lock file.

### pip's Problem

For pip, a venv for Poetry is required, causing each Poetry command to be prefixed with the path to the venv, shown as the example below:

```bash
python3 -m venv poetry_venv
poetry_venv/bin/pip install poetry==1.8.4
poetry_venv/bin/poetry --version
```

Fortunately, `source poetry_venv/bin/activate` is not required and Poetry's dependencies would be installed to the correct path.
But it is still inconvenient to use `poetry_venv/bin/poetry`, epsecially all existing Poetry commands, e.g., the ones in scripts, require updating.

Adding `poetry` executable to `PATH` can solve the problem, which is to add `/vercel/.local/bin`, but Vercel can **change this path in the future**, since it is not promised.

### pipx's Problem

For pipx, its own installation has problems.
Among the installation methods recommended by pipx's doc, the package manager **dnf** (in Fedora) or **pip** can be used.
But the build image's dnf package sources do not have Poetry, unlike the one of Fedora.

To use pip to install pipx, the following commands are required:

```bash
python3 -m pip install --user pipx
python3 -m pipx ensurepath
python3 -m pipx --version
```

pip installs pipx to `/vercel/.local/bin`, but `python3 -m pipx` can run pipx.
`pipx ensurepath` ensures the directory for executables installed by pipx is in `PATH`, meaning these executables can be run directly as commands.
This is **exactly what we want** to avoid touching `/vercel/.local/bin`.
But `pipx ensurepath` requires opening a new terminal, re-logging in, or running `source ~/.bashrc` to take effect.
The first two are not possible in Vercel Builds.

For `source ~/.bashrc`, as Vercel provides two user-configurable commands, the install command and build command, `source ~/.bashrc` in the install command does not work for the build command, even though `~/.bashrc` has been modified.
So `source ~/.bashrc` is also required in the build command, which is inconvenient.

## Solution

We solve the Poetry installation problem based on the pip method.
We still create a venv for Poetry, but soft-link the `poetry` executable to a directory that is already in `PATH`, e.g., `/usr/local/bin`, shown below:

```bash
python3 -m venv poetry
poetry/bin/pip install poetry==1.8.4
ln -s -t /usr/local/bin $(pwd)/poetry/bin/poetry
poetry --version
```

`$(pwd)` ensures the soft-link is linked to an absolute path.

Now `poetry` command is available both in the install and build commands without a prefix.

As Vercel builds can be [configured with a `vercel.json` file](https://vercel.com/docs/projects/project-configuration), we can put the above solution as the below snippet in `vercel.json`:

```json
{
  "installCommand": "python3 -m venv poetry && poetry/bin/pip install poetry==1.8.4 && ln -s -t /usr/local/bin $(pwd)/poetry/bin/poetry && poetry install",
  "buildCommand": "poetry run ..."
}
```
