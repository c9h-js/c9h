![cottonmouth](https://user-images.githubusercontent.com/24438483/126182599-b04d8b13-6786-45e7-80be-3cdbb8086a05.png)

# 🐍 cottonmouth

> `cottonmouth` is a zero-config config for Node.js with support for JSON, JSON5, INI, YAML, TOML, JS, and env vars!

* 📁 **One library, many formats.** JSON, JSON5, INI, YAML, TOML, and JavaScript are all supported out-of-the-box as file formats!
* 💻 **Environment variables.** Handle environment variables as a source of configuration with no effort!
* 💯 **Zero configuration.** `cottonmouth` works out-of-the-box using sensible defaults with no configuration required!
* 💪 **Typescript.** Fully typed and self-documenting.
* 🪖 **Full test coverage.** Battle-hardened with full unit-testing coverage.

> **`cottonmouth` is still in development, but most desired functionality is present and breaking changes are unlikely.**

## Installation

`cottonmouth` is available on NPM under the package name `c9h`. You can add it to your project like so:

```bash
npm install c9h
# OR
yarn add c9h
```

## Usage

```js
const config = require('c9h')({ /* options */ })
// OR
import c9h from 'c9h'
const config = c9h({ /* options */ })
```

This will look for `your-package.{toml,yaml,yml,js,json,json5,ini}` in `./` (the current working directory), `/etc/your-package/`, and `$HOME/.your-package/`, and store the parsed config in the `config` variable.

## Options

Although `cottonmouth` is advertised as a "zero-config config", it's actually an extremely extensible package.

When invoking `c9h()`, you can optionally provide an object contains various settings to configure how `cottonmouth` functions. The default values are included below:

```js
const options = {
  name: process.env.npm_package_name || path.parse(process.cwd()).name,
  defaults: {},
  parsers: ['json', 'json5', 'js', 'toml', 'yaml', 'ini'],
  paths: [(name) => `${process.env.HOME}/.${name}`, process.cwd(), (name) => `/etc/${name}`],
  mergeArray: true,
}
```

### `name`

This is the name of the configuration file (excluding the file extension) that is searched for and parsed by `cottonmouth`.

By default, this is automatically generated as the name provided in your project's `package.json` file, or the name of your project's working directory.

### `defaults`

This is the object containing any default values for your configuration. See [Value Priority](#value-priority) for guidance on the priority of configuration values from different sources.

By default, there are no default configuration values.

### `parsers`

This is an array of configuration file parsers that you'd like `cottonmouth` to use. Removing a parser from this array will allow you to ignore a configuration file in a specific file format (even if it exists).

By default, all parsers (`['json', 'json5', 'js', 'toml', 'yaml', 'ini']`) are enabled.

### `paths`

This is an array of functions that represent the different directories `cottonmouth` should look for your configuration file in. Each function should return a string which is the directory path, and the `name` option is provided to the function as an argument to allow for dynamic directories based on your project name.

By default, the current working directory (`process.cwd`), the etc directory (``/etc/${name}``), and a hidden directory in your user's HOME directory (``$HOME/.${name}``).

For example, if your project's name is `c9h` and your current working directory is `/var/www`, `cottonmouth` will look for your configuration file in these three places by default: `/var/www`, `/etc/c9h`, and `/home/lukecarr/.c9h`.

### `mergeArray`

This dictates how arrays are handled in configuration files. If set to `true`, arrays in configuration files will be merged with the default value, rather than replaced.

By default, this option is set to `true`.

## Environment variables

`cottonmouth` has out-of-the-box support for environment variables. Environment variables should be prefixed with your project's name (`options.name`) in uppercase with `_`'s used as spaces.

### Example

> In the below example, the project's name is `c9h`.

Given the following environment variables:

```bash
C9H_SERVER_PORT=3000
C9H_SERVER_HOST=0.0.0.0
```

This would be parsed by `cottonmouth` into the following configuration object, overriding any default values or values parsed from a configuration file:

```js
const config = {
  server: {
    port: '3000',
    host: '0.0.0.0',
  },
}
```

> It's important to note (as the above example indicates) that all environment variables are parsed as strings, even if they have numeric values (such as the `C9H_SERVER_PORT` env var above).

## Value Priority

When `cottonmouth` loads your configuration, it assumes the following priority order for configuration values:

1. Default values specified in `options.defaults` (LOWEST)
2. Values parsed from a configuration file
3. Environment variables (HIGHEST)

## License

`cottonmouth` is licensed under the [`MIT License`](LICENSE)
