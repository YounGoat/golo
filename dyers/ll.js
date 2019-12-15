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
        re: /^(total\s)(\d+)$/,
        colornames: [
            null,
            'bold',
        ],
    },
    {
        // Item
        re: /^(\S+)(\s+)(\S+)(\s+)(\S+)(\s+)(\S+)(\s+)(\S+)(\s+)(\S+)(\s+)(\S+)(\s+)(\S+)(\s+)(\S+)$/,
        colornames: [
            /* mode */ 'red',
            null,
            /* ? */ null,
            null,
            /* user */ 'cyan',
            null,
            /* group */ 'yellow',
            null,
            /* size */ 'blue',
            null,
            /* date.month */ 'dim.green',
            null,
            /* date.date */ 'dim.green',
            null,
            /* date.year | date.time */ 'dim.green',
            null,
            /* name */ null,
        ],
    }
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