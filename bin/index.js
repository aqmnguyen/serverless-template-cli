#!/usr/bin/env node

const package = require('./../package.json');
const program = require('commander');
const chalk = require('chalk');

const createTemplate = require('../lib/createTemplate');

let projectDirectory = null;

/**
 * Main
 */
program
  .version(package.version)
  .arguments('<project>')
  .action((project) => {
    projectDirectory = project;
  })
  .option('-n, --name <type>', 'name of service i.e movableInk-11111-remote-file')

/**
 * Additional Help Info
 */
program.on('--help', () => { });

program.parse(process.argv);

if (!projectDirectory) {
  console.error(chalk.red('No Directory Path provided'));
  console.error(chalk.red('Full command should be: '))
  console.error(chalk.green('remote-template directoryName -n serviceName'));
  process.exit(1);
}

if (!program.name) {
  console.error(chalk.red('No service name provided'));
  console.error(chalk.red('Full command should be: '));
  console.error(chalk.green('remote-template directoryName -n serviceName'));
  process.exit(1);
}

/**
 * Create template
 */

console.log(chalk.blue(`Creating ${projectDirectory}`));
createTemplate(projectDirectory, program);
