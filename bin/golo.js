#!/usr/bin/env node

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , readline = require('readline')
    
    /* NPM */
    , commandos = require('commandos')
    , noda = require('noda')
    
    /* in-package */
    ;

const groups = [
    [
        '--help -h NULL REQUIRED',
    ],
    [
        '--command -c [0] NOT NULL DEFAULT("default")',
    ],
];

const cmd = commandos.parse(process.argv.slice(1), { 
    explicit: true,
    groups,
    catcher: err => {
        console.error(err.message);
        console.log('Run "golo --help" to see detailed help info.');
        process.exit(1);
    }
});

if (cmd.help) {
    console.log(noda.inRead('help.txt', 'utf8'));
    return;
}

if (!noda.inExists(`dyers/${cmd.command}.js`) && !noda.inExists(`dyers/${cmd.command}`)) {
    console.error(`No dyer for command "${cmd.command}" defined.`);
    return;
}
const dye = noda.inRequire(`dyers/${cmd.command}`);

const rl = readline.createInterface({
    input: process.stdin,
});

let index = 0;
rl.on('line', line => {
    console.log(dye(line, index++));
});

rl.resume();
