# Stopify [![Build Status](https://travis-ci.org/plasma-umass/Stopify.svg?branch=master)](https://travis-ci.org/plasma-umass/Stopify)
## Dependencies
1. Install the latest version of node.
2. To install the dependecies, run `npm install` in the root of the project.
3. (optional) Run `npm install -g babel-cli` for a global installation of
   babel. If you skip this step, use `./node_modules/.bin/babel` instead of
   `babel` in all the following commands.

## Testing
### Test Suite
* Run the test suite using `npm test`.

### Compiling a single file
* To compile a file, run `babel <filename>`.
* Use `transform.js`.

### Adding tests
* Tests are defined inside the `tests/should-compile` and `tests/should-run`
  folders. Write a single JS test file in either of these folder to add it as a
  test.

## ## Resources
AST explorer for JS (select babylon as the parser): [[astexplorer.net](astexplorer.net)]
