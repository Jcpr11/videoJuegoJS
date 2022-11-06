/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '🕸️',
    'I': '🏆',
    'PLAYER': '🐧',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
    'HEART': '❤️',
};

const maps = [];
maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
`);
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
`);
maps.push(`
    O-------XX
    XXX--XXXXX
    XXXX--XXXX
    XXXXX--XXX
    XXXXXX-XXX
    XXXXX--XXX
    XXXX--XXXX
    XXXX-XXXXX
    XXI--XXXXX
    XXXXXXXXXX
`);
maps.push(`
    XXXXIXXXXX
    XXXX-XXXXX
    XXX--XXXXX
    XXX-X--XXX
    --X-XX-XXX
    -XX----XXX
    -XXXX--XXX
    -XXX-X--XX
    --O--XX-XX
    XXXX----XX
`);
maps.push(`
    XXX-O-----
    XXXXXXXXX-
    X----XX---
    X-XX----X-
    --XXXXXXX-
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -----XX-IX
    XXXX----XX
`);
maps.push(`
    ----------
    X-XXXXXXI-
    X-----XXXX
    X-XXX-XXXX
    XXXXX-XXXX
    -XX---XXXX
    -XX-XXXXXX
    X---XXXXXX
    X--XXXX-OX
    XX-------X
`);
maps.push(`
    XX----XXXX
    X--XX-XXO-
    XX-XX-XXX-
    X--XX-----
    X-XXXXXXXX
    X-XXXXXXXX
    --X-XXXXXX
    --X-XXXXXX
    --X-XXXXXX
    IXXXXXXXXX
`);
maps.push(`
    ----------
    -XXXXXXX--
    -XXXXXX--X
    -XXXXXX-X-
    -XXXI---XX
    -XXXXXXXXX
    -----XXXXX
    XXXX-----X
    XXXXXXXX-X
    O--------X
`);
maps.push(`
    XX--------
    X--XXXXXX-
    --XXXXX---
    -XXXXX--XX
    ----OX-XXX
    XXXXXX--X-
    XX--IXX--X
    X--XXX--XX
    --XXX--XX-
    X-----XXXX
`);