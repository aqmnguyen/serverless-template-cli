const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const chalk = require('chalk')

function createTemplate(directory, program) {

  const { name } = program;
  const functionName = _camelize(name);

  const newDir = path.join(process.cwd(), '/', directory);

  // Check to see if currentPath has the directory we want to make
  if (fs.existsSync(newDir)) {
    // console.error(chalk.red(`Directory ${directory} exists`));
    // process.exit(1);
  } else {
    fs.mkdirSync(newDir);
  }

  // Move blueprint template across to newly made directory
  const blueprintDir = path.join(__dirname, '../', 'blueprint');
  const bluePrintFiles = fs.readdirSync(blueprintDir)

  bluePrintFiles.forEach(file => {
    const src = path.join(blueprintDir, file);
    const dest = path.join(newDir, file);
    fs.copyFileSync(src, dest);
  });

  // run yarn on new directory to install dependencies
  process.chdir(newDir);
  let args = [];
  const command = 'yarnpkg';

  args.push('--cwd');
  args.push(newDir);

  spawn.sync(command, args, { stdio: 'inherit' });

  console.log(chalk.green('Finished installing'));
  console.log(chalk.green(`cd ${directory}`));

}

/**
 * 
 * Takes a string like movableInk-1111-remote-file
 * Returns: movableInk1111RemoteFile
 * 
 * @param {*} str 
 */

function _camelize(str) {
  str = str.replace(/\-/g, ' ');
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index == 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

module.exports = createTemplate;
