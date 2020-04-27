#!/usr/bin/env node

const yParser = require('yargs-parser');
const semver = require('semver');
const { existsSync } = require('fs');
const { join } = require('path');
const chalk = require('chalk');
const run = require('./lib/index');

// print version and @local
const args = yParser(process.argv.slice(2));

const name = args._[0] || '';
const { type } = args;
delete args.type;

(async () => {
  await run({
    name,
    type,
    args,
  });
  //process.exit(0);
})();