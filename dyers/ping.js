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
        re: /^(PING )([\w.]+)( )(\([\d.]+\))(: )(\d+)( data bytes)$/,
        colornames: [
            'dim',
            'green.bold',
            null,
            'blue.bold',
            'dim',
            'dim',
            'dim',            
        ],
    },
    {
        // Statistics section title.
        re: /^(--- )([\w.]+)( ping statistics)( ---)$/,
        colornames: [
            'dim',
            'green',
            null,
            'dim',
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