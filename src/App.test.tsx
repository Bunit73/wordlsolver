// https://www.newline.co/@bespoyasov/how-to-write-your-first-unit-test-in-react-typescript-app--ca51d0c0
import React from 'react';
import {render, screen} from '@testing-library/react';
import {App, LetterInBothListWarning, WordContainsLetters, WordExcludesLetters, WordFilter} from './App';

test('renders page title', () => {
    render(<App/>);
    const titleElement = screen.getByText(/Solver for Wordle/i);
    expect(titleElement).toBeInTheDocument();
});

describe('letters in both list function', () => {

    test('both strings empty', () => {
        const [a, b, expected] = ["", '', false];

        const result = LetterInBothListWarning(a, b);

        expect(result).toEqual(expected);
    })

    test('included string empty', () => {
        const [a, b, expected] = ["", 'abc', false];

        const result = LetterInBothListWarning(a, b);

        expect(result).toEqual(expected);
    })

    test('excluded string empty', () => {
        const [a, b, expected] = ["abc", '', false];

        const result = LetterInBothListWarning(a, b);

        expect(result).toEqual(expected);
    })

    test('letters not in both lists', () => {
        const [a, b, expected] = ["abcdefg", 'hijklmnop', false];

        const result = LetterInBothListWarning(a, b);

        expect(result).toEqual(expected);
    })

    test('when letter in both strings', () => {
        const [a, b, expected] = ["abcdefg", 'b', true];

        const result = LetterInBothListWarning(a, b);

        expect(result).toEqual(expected);
    })
})

describe('word excludes letters function', () => {
    test('when given no word', () => {
        const [a, b, expected] = ['', [], true];

        const result = WordExcludesLetters(a, b);

        expect(result).toEqual(expected);
    })

    test('when word has an excluded letter', () => {
        const [a, b, expected] = ['skier', ['s', 'k'], false];

        const result = WordExcludesLetters(a, b);

        expect(result).toEqual(expected);
    })

    test('when word does not have an excluded letter', () => {
        const [a, b, expected] = ['skier', ['a', 'b', 'c'], true];

        const result = WordExcludesLetters(a, b);

        expect(result).toEqual(expected);
    })
})

describe('word includes letters function', () => {
    test('when given no word', () => {
        const [a, b, expected] = ['', [], true];

        const result = WordContainsLetters(a, b);

        expect(result).toEqual(expected);
    })

    test('word doesnt contain letter', () => {
        const [a, b, expected] = ['abcde', [{
            letters: 'z',
            correctPos: true,
            pos: 1
        }], false];

        const result = WordContainsLetters(a, b);

        expect(result).toEqual(expected);
    })

    test('word doesnt contain letter at all', () => {
        const [a, b, expected] = ['abcde', [{
            letters: 'z',
            correctPos: false,
            pos: 1
        }], false];

        const result = WordContainsLetters(a, b);

        expect(result).toEqual(expected);
    })

    test('filter out known letters at bad postions', () => {
        const [a, b, expected] = ['abcde', [{
            letters: 'fgh',
            correctPos: false,
            pos: 1
        }], false];

        const result = WordContainsLetters(a, b);

        expect(result).toEqual(expected);
    })

    test('word contains letter wrong position', () => {
        const [a, b, expected] = ['abcde', [{
            letters: 'e',
            correctPos: false,
            pos: 1
        }], true];


        const result = WordContainsLetters(a, b);

        expect(result).toEqual(expected);
    })

    test('word contains letter correct position', () => {
        const [a, b, expected] = ['abcde', [{
            letters: 'a',
            correctPos: true,
            pos: 0
        }], true];


        const result = WordContainsLetters(a, b);

        expect(result).toEqual(expected);
    })
})

describe('word filter', () => {
    test('no words or filters', () => {
        const [a, b, c, expected] = [[], [], [], []];

        const result = WordFilter(a, b, c);

        expect(result).toEqual(expected);
    })

    test('no words with filter', () => {
        const [a, b, c, d, expected] = [[], [], [], 'dog', []];

        const result = WordFilter(a, b, c, d);

        expect(result).toEqual(expected);
    })

    test('words with no include or excluded words and filter off', () => {
        const [a, b, c, expected] = [['cat', 'dog'], [], [], ['cat', 'dog']];

        const result = WordFilter(a, b, c);

        expect(result).toEqual(expected);
    })

    test('words with no include or excluded words and filter on', () => {
        const [a, b, c, d, expected] = [['cat', 'dog'], [], [], 'd', ['dog']];

        const result = WordFilter(a, b, c, d);

        expect(result).toEqual(expected);
    })
})
