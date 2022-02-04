import React, {useEffect, useState} from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import {Columns, Container, Heading, Section} from "react-bulma-components";
import {PossibleWords} from './PossibleWords';
import {IIncludedLetters} from "./Models/Models";
import {ExcludedLetters} from "./ExcludedLetters";
import {IncludedLetters} from "./IncludedLetter";
import Words from "./Words.json";

function App() {
    const initIncludeLetters = [
        {
            letters: '',
            correctPos: false,
            pos: 0
        },
        {
            letters: '',
            correctPos: false,
            pos: 1
        },
        {
            letters: '',
            correctPos: false,
            pos: 2
        },
        {
            letters: '',
            correctPos: false,
            pos: 3
        },
        {
            letters: '',
            correctPos: false,
            pos: 4
        }
    ]

    let [words, setWords] = useState<string[]>([])
    let [filteredWords, setFilteredWords] = useState<string[]>([])
    let [excludedLetters, setExcludedLetters] = useState<string[]>([])
    let [includedLetters, setIncludedLetters] = useState<IIncludedLetters[]>(initIncludeLetters)
    let [filter, setFilter] = useState('')


    useEffect(() => {
        let wl: string[] = Words.wordList.sort();
        setWords(wl);
        setFilteredWords(WordFilter(wl, excludedLetters, includedLetters))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const WordFilter = (words: string[], excludedLetters: string[], includedLetters: IIncludedLetters[], filter?: string): string[] => {
        let nwl: string[] = [];
        let excluded = true;
        let found = false;
        let hasSubStr = false;

        for (const w of words) {

            excluded = WordExcludesLetters(w, excludedLetters);
            found = WordContainsLetters(w, includedLetters)

            if (filter && filter.length > 0) {
                hasSubStr = w.includes(filter)
            } else {
                hasSubStr = true;
            }

            if (excluded && found && hasSubStr) {
                nwl.push(w)
            }
        }
        return nwl;
    }

    const WordContainsLetters = (word: string, letters: IIncludedLetters[]): boolean => {

        const lList = letters.filter(x => x.letters.length > 0);
        const posKnownList = letters.filter(x => x.correctPos);
        const posKnownIncorrectList = letters.filter(x => !x.correctPos);

        // no included letters
        if (lList.length === 0) {
            return true;
        }

        // filter out known letter positions
        for (const l of posKnownList) {
            if (word[l.pos] !== l.letters[0]) {
                return false;
            }
        }

        // filter out known letters bad positions
        for (const il of posKnownIncorrectList) {
            for (const l of il.letters) {
                if (word[il.pos] === l) {
                    return false;
                }
            }
        }

        return true;
    }

    const WordExcludesLetters = (word: string, letters: string[]): boolean => {
        if (letters.length === 0) {
            return true;
        } else {
            for (const e of letters) {
                if (word.includes(e)) {
                    return false;
                }
            }

            return true;
        }
    }


    return (
        <div className="App">
            <Section>
                <Heading>
                    Solver for Wordle
                </Heading>
            </Section>
            <Section>
                <Container>
                    <Columns>
                        <Columns.Column>
                            <PossibleWords
                                words={filteredWords}
                                filterChange={(val) => {
                                    setFilter(val)
                                    setFilteredWords(WordFilter(words, excludedLetters, includedLetters, val))
                                }}
                            />
                        </Columns.Column>
                        <Columns.Column>
                            <IncludedLetters
                                includedLetters={includedLetters}
                                onChange={(val) => {
                                    setIncludedLetters(val)
                                    setFilteredWords(WordFilter(words, excludedLetters, val, filter))
                                }}/>
                            <ExcludedLetters
                                excludedLetters={excludedLetters}
                                onChange={(val) => {
                                    const eL = Array.from(new Set(val));
                                    setExcludedLetters(eL)
                                    setFilteredWords(WordFilter(words, eL, includedLetters, filter))
                                }}
                            />
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        </div>
    );
}

export default App;
