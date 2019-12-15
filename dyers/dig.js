'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , colors = require('colors')
    
    /* in-package */
    ;

const PATTERNS = [
    {
        // Header.
        re: /^(;\s)(<<>>)(\s)(DiG)(\s)(\d+\.\d+\.\d+)(\s)(<<>>)(\s)(.+)$/,
        colornames: [
            'dim',
            'dim', 
            null,
            'bold',
            null,
            null,
            null,
            'dim',
            null,
            'green',
        ],
    },
    {
        // Section title.
        re: /^(;;\s)([A-Z\s]+)(:)$/,
        colornames: [
            'dim',
            'italic.bold.red.dim',
            'dim',
        ],
    },
    {
        re: /^(;+)(.+)/,
        colornames: [
            'dim', 
            null,
        ],
    },
    {
        // Answer.
        re: /^([\w.]+)(\s+)(\d+)(\s+)(IN)(\s+)(CNAME|A)(\s+)([\w.]+)$/,
        colornames: [
            'green',
            null,
            null,
            null,
            'dim',
            null,
            'blue',
            null,
            'green',
        ],
    },
];

module.exports = function(line, linenum) {
    let output = line;
    PATTERNS.find(pattern => {
        let matched = line.match(pattern.re);
        if (matched) {
            let parts = [];
            for (let i = 1; i < matched.length; i++) {
                let part = matched[i];
                let colorname = pattern.colornames[i-1];
                if (colorname) {
                    part = eval(`colors.${colorname}`)(part);
                }
                parts.push(part);
            }
            output = parts.join('');
            return true;
        }
    });
    return output;
};