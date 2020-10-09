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

Use `zsh-newuser-install` which is started when get into zsh firstly.
Only get into config 4 to add `unsetopt beep`. 

Then follow readme to config [antigen](https://github.com/zsh-users/antigen).
Put at `~/.local/share/antigen.zsh`.

Get into zsh again to make antigen to install plugins.

```bash
# Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000
unsetopt beep
bindkey -e
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename '/home/[user]/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall

# antigen
source $HOME/.local/share/antigen.zsh
antigen use oh-my-zsh
antigen bundle git
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-autosuggestions
antigen theme fino
antigen apply

# env
export EDITOR=/usr/bin/nvim
export PATH="$HOME/.local/bin:$HOME/.gem/ruby/2.7.0/bin:$HOME/.cargo/bin:$PATH"

# alias
alias sudo='sudo '
alias cp='cp -i'
alias mv='mv -i'
alias rm='rm -I'
alias p='proxychains -q '
alias m='dolphin . &|'
alias bright='xrandr --output HDMI-0 --brightness'

# conda
source /opt/miniconda3/etc/profile.d/conda.sh
```

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
"\t"aa = add -A
"\t"c = commit
"\t"ca = commit --amend
"\t"caa = commit -a
"\t"co = checkout
"\t"r = reset
"\t"ts = stash save
"\t"tp = stash pop
"\t"ta = stash apply
"\t"l = log
"\t"ll = log --oneline --graph
"\t"p = push
"\t"pm = push origin master
"\t"rb = rebase
"\t"cl = clone
"\t"cla = clone --depth=1
[pull]
"\t"rebase = true
[credential]
"\t"helper = cache --timeout 86400
```

## Editor: Neovim - `~/.config/nvim/init.vim`

Choose Neovim for better default config.

Follow readme to config [vim-plug](https://github.com/junegunn/vim-plug)

Use `:PlugInstall` in Neovim to install plugins.

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
