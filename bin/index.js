#!/usr/bin/env node

const package = require('./../package.json');
const program = require('commander');

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
  console.error('No Directory Path provided');
  console.error('Full command should be: ')
  console.error('remote-template directoryName -n serviceName');
  process.exit(1);
}

if (!program.name) {
  console.error('No service name provided');
  console.error('Full command should be: ')
  console.error('remote-template directoryName -n serviceName')
  process.exit(1);
}

/**
 * Create template
 */

createTemplate(projectDirectory, program);
