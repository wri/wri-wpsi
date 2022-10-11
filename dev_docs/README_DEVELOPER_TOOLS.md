## Developer Tools

#### VS Code solargraph
Solargraph provides a ruby language server and some limited tooling (process yard annotation, find references, go to definition, rename symbol)

The solargraph ruby gem is needed and should be in the Gemfile. Then install the solargraph extension for vscode to enable it.

[extension](https://marketplace.visualstudio.com/items?itemName=castwide.solargraph)
[solargraph gem](https://solargraph.org/)

Note: vscode needs this path or or you'll get "gem not installed" type errors
```
{
  ...
  "solargraph.commandPath": "/usr/local/bundle/bin/solargraph",
  // "solargraph.logLevel": "debug",
}
```

#### VS Code formatting rubocop

Install the [ruby extension for vscode](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)

enable inline linting and formatting for ruby with this vscode config (requires rubocop)
```
{
  ...
  "ruby.useLanguageServer": true,
  "ruby.format": "rubocop",
  "ruby.lint": {
    "rubocop": {
      "useBundler": true // enable rubocop via bundler
    }
  },
}
```

#### VS Code remote-development extension
If using docker,  vscode's remote-development extension can connect to the docker container directly, that gives me access to integrated tooling inside the container (rubocop, eslint, etc) can can forward your git config / creds into the container (you might need to run `ssh-add -A` before starting vscode)
