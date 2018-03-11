#!/usr/bin/env node
const program = require('inquirer');
const pkg = require('../package.json');
const cli = require('../build/nettiopsu');
const nettiopsu = cli.nettiopsu;

program.prompt([
  {
    type: 'input',
    message: 'username',
    name: 'user',
  },
  {
    type: 'password',
    message: 'Enter a password',
    name: 'password',
  }
  ])
  .then(answers => {
    nettiopsu(answers.user, answers.password)
        .then(data => {
            console.log(JSON.stringify(data, null));
        });
  });
