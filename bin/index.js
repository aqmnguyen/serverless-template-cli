#!/usr/bin/env node

const package = require('./../package.json');
const program = require('commander');

const createTemplate = require('../lib/createTemplate');

let projectName;

/**
 * Main
 */
program
  .version(package.version)
  .arguments('<project>')
  .action((project) => {
    projectName = project;
  })
  .option('-t, --template <template>', 'template type');

/**
 * Additional Help Info
 */
program.on('--help', () => {});

program.parse(process.argv);

/**
 * Create template
 */

createTemplate(projectName, program);
