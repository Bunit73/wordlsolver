// https://www.newline.co/@bespoyasov/how-to-write-your-first-unit-test-in-react-typescript-app--ca51d0c0
import React from 'react';
import {render, screen} from '@testing-library/react';
import {App, LetterInBothListWarning, WordExcludesLetters} from './App';

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
