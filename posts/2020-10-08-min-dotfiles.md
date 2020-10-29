title: Minimized dotfiles sharing
id: 4
---
## Principles

Prefer to default keymap.

You may not require some config.
Just remove them to keep your config clean.

```
#define [user] "your Unix username"
#define [git-user] "your Git username"
#define [git-email] "your Git email"
```

## Shell: Zsh - `~/.zshrc` 

Use `zsh-newuser-install` which is started when getting into zsh firstly.
Only go to config 4 and add `unsetopt beep` to disable bell. 

Then follow [zinit](https://github.com/zdharma/zinit) guide to install it:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/zdharma/zinit/master/doc/install.sh)"
```

Then edit the zshrc file:

```bash
# Lines configured by zsh-newuser-install
# ...
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
# ...
# End of lines added by compinstall

# env
export EDITOR=/usr/bin/nvim
export PATH="$HOME/.local/bin:$PATH"

# alias
alias sudo='sudo '
alias cp='cp -i'
alias mv='mv -i'
alias rm='rm -I'

### Added by Zinit's installer
# ...
### End of Zinit's installer chunk

# zinit
zinit light zsh-users/zsh-syntax-highlighting                                                                       
zinit light zsh-users/zsh-autosuggestions                                                                           
zinit snippet OMZL::git.zsh                                                                                         
zinit snippet OMZL::prompt_info_functions.zsh                                                                       
zinit snippet OMZL::spectrum.zsh                                                                                    
zinit snippet OMZP::git                                                                                             
setopt promptsubst
zinit snippet OMZT::fino
```

Used zsh plugins:

- zsh-users/zsh-syntax-highlighting
- zsh-users/zsh-autosuggestions
- oh-my-zsh plugin: git
- oh-my-zsh theme: fino

## Shell: tmux - `~/.tmux.conf`

```
set -g default-terminal screen-256color
set -g mouse on
```

## Version: Git - `~/.gitconfig`

Git config uses tab to indent.
Use `:%s/"\\t"/\t/g` in Vim to make substitution.

```
[user]
"\t"name = [git-user]
"\t"email = [git-email]
[alias]
"\t"s = status
"\t"a = add
"\t"A = add -A
"\t"c = commit
"\t"l = log
"\t"ll = log --oneline --graph
[pull]
"\t"rebase = true
[credential]
"\t"helper = cache --timeout 86400
```

## Editor: Neovim - `~/.config/nvim/init.vim`

Choose Neovim for better default config.

Follow [vim-plug](https://github.com/junegunn/vim-plug) guide to install:

```bash
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

Then edit the init.vim file:

```vim
set tabstop=2 expandtab
set shiftwidth=2
set smartindent
set termguicolors
set list
set lcs=tab:>.,space:.

" vim-plug
call plug#begin('~/.local/share/nvim/plugged')
  Plug 'morhetz/gruvbox'
  Plug 'vim-airline/vim-airline'
  Plug 'vim-airline/vim-airline-themes'
call plug#end()

" gruvbox
colorscheme gruvbox
```

Then use `:PlugInstall` in Neovim to install plugins.

## Editor: Visual Studio Code

### Plugins

- `k--kato.intellij-idea-keybindings`: IntelliJ IDEA Keybindings
- `ms-python.python`: Python
- `ms-vscode.cpptools`: C/C++
- `mshr-h.veriloghdl`: Verilog-HDL/SystemVerilog/Bluespec SystemVerilog
- `PKief.material-icon-theme`: One Dark Pro
- `zhuangtongfa.material-theme`: Material Icon Theme

### General config - `~/.config/Code/settings.json`

Install `flake8` and `autopep8` for Python.

```json
{
    "files.trimTrailingWhitespace": true,
    "editor.fontFamily": "'Source Code Pro', 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'",
    "editor.tabSize": 2,
    "update.showReleaseNotes": false,
    "telemetry.enableCrashReporter": false,
    "telemetry.enableTelemetry": false,
    "editor.minimap.enabled": false,
    "editor.renderWhitespace": "boundary",
    "python.formatting.autopep8Args": [
        "--max-line-length=120"
    ],
    "python.linting.flake8Args": [
        "--max-line-length=120",
        "--extend-ignore=F841"
    ],
    "editor.rulers": [
        80,
        120
    ],
    "workbench.colorTheme": "One Dark Pro",
    "workbench.iconTheme": "material-icon-theme",
    "python.linting.pylintEnabled": false,
    "python.linting.flake8Enabled": true,
    "[python]": {
        "editor.tabSize": 4
    },
    "explorer.confirmDelete": false,
    "workbench.startupEditor": "none",
    "html.format.endWithNewline": true,
    "html.format.indentHandlebars": true,
    "html.format.extraLiners": "",
    "files.insertFinalNewline": true
}
```

### Keymap - `~/.config/Code/keybindings.json`

```json
[
  {
    "key": "shift+alt+down",
    "command": "-editor.action.moveLinesDownAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "shift+alt+up",
    "command": "-editor.action.moveLinesUpAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+v tab",
    "command": "type",
    "args": {
      "text": "\t"
    },
    "when": "editorTextFocus"
  }
]
```
