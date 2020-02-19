/**
 * Algorithm to check if a word exists inside a crossword.
 * 
 * @author Andrew Esteves <esteves.andrew@gmail.com>
 */

let crossword = [
    ['s', 'b', 'y', 'i', 's'],
    ['p', 'p', 'c', 'p', 'e'],
    ['t', 'd', 'a', 'b', 'a'],
    ['i', 'i', 'c', 'i', 'e'],
    ['b', 'd', 'c', 'b', 'n'],
]
let word = 'spain'

/**
 * Check if the word exists in the crossword.
 * 
 * @param {string} word
 * @param {array} crossword
 * @returns {boolean}
 */
function hasWord(word, crossword) {
    let exists = false
    if(!word) {
        return false
    }

    if(!crossword.length) {
        return false
    }
    
    for (let i = 0; i < crossword.length; i++) {
        for (let j = 0; j < crossword[i].length; j++) {
            if (crossword[i][j] == word[0]) {
                exists = exists || lookAround(word[1], i, j, word, crossword)
            }
        }
    }
    return exists
}

/**
 * Check the possibilities around a letter in matrix.
 * 
 * @param {string} letter
 * @param {number} i
 * @param {number} j
 * @param {string} word
 * @param {array} crossword
 * @returns {boolean}
 */
function lookAround(letter, i, j, word, crossword) {
    let ii, jj
    let exists = false

    if(crossword[i][j - 1] && crossword[i][j - 1] == letter) {
        ii = i
        jj = j - 1
        exists = exists || direction([0, ii, -1, jj], true, word, crossword)
    }
    if(crossword[i][j + 1] && crossword[i][j + 1] == letter) {
        ii = i
        jj = j + 1
        exists = exists || direction([0, ii, 1, jj], true, word, crossword)
    }

    if(crossword[i - 1]) {
        for (let x = j - 1, y = -1; x <= j + 1; x++, y++) {
            if(crossword[i - 1][x] && crossword[i - 1][x] == letter) {
                ii = i - 1
                jj = x
                exists = exists || direction([-1, ii, y, jj], true, word, crossword)
            }
        }
    }

    if(crossword[i + 1]) {
        for (let x = j - 1, y = -1; x <= j + 1; x++, y++) {
            if(crossword[i + 1][x] && crossword[i + 1][x] == letter) {
                ii = i + 1
                jj = x
                exists = exists || direction([1, ii, y, jj], true, word, crossword)
            }
        }
    }

    return exists
}

/**
 * Moving forward the same direction.
 * 
 * @param {array} coords
 * @param {boolean} start
 * @param {string} word
 * @param {array} crossword
 * @returns {boolean}
 */
function direction(coords, start, word, crossword) {
    pivot = start ? 2 : pivot + 1

    if(pivot == word.length) {
        return true
    }
    
    if(coords[0] == 0) {
        let c = move(coords, word, pivot)
        return c.length ? direction(c, false, word, crossword) : false
    }

    if(coords[0] == -1) {
        coords[1]--
        if(coords[2] == 0) {
            if(crossword[coords[1]][coords[3]] == word[pivot]) {
                return direction(coords, false, word, crossword)
            }
        } else {
            let c = move(coords, word, pivot)
            return c.length ? direction(c, false, word, crossword) : false
        }
    }

    if(coords[0] == 1) {
        coords[1]++
        if(coords[2] == 0) {
            if(crossword[coords[1]][coords[3]] == word[pivot]) {
                return direction(coords, false, word, crossword)
            }
        } else {
            let c = move(coords, word, pivot)
            return c.length ? direction(c, false, word, crossword) : false
        }
    }

    return false
}

/**
 * Moving left or right.
 * 
 * @param {array} coords
 * @param {string} word
 * @param {number} pivot
 * @returns {boolean}
 */
function move(coords, word, pivot) {
    if(coords[2] == 1) {
        coords[3]++
        if(crossword[coords[1]][coords[3]] == word[pivot]) {
            return coords
        }
    }else {
        coords[3]--
        if(crossword[coords[1]][coords[3]] == word[pivot]) {
            return coords
        }
    }
    return []
}

// Check if exists
console.log(hasWord(word, crossword))