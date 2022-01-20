import React, {useEffect, useState} from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import {Columns, Container, Heading, Section} from "react-bulma-components";
import {PossibleWords} from './PossibleWords';
import {IIncludedLetter} from "./Models/Models";
import {ExcludedLetters} from "./ExcludedLetters";
import {IncludedLetters} from "./IncludedLetter";
// @ts-ignore
import raw from "./filtered_words.txt";

function App() {
    const initIncludeLetters = [
        {
            letter: '',
            correctPos: false,
            pos: 0
        },
        {
            letter: '',
            correctPos: false,
            pos: 1
        },
        {
            letter: '',
            correctPos: false,
            pos: 2
        },
        {
            letter: '',
            correctPos: false,
            pos: 3
        },
        {
            letter: '',
            correctPos: false,
            pos: 4
        }
    ]

    let [words, setWords] = useState<string[]>([])
    let [filteredWords, setFilteredWords] = useState<string[]>([])
    let [excludedLetters, setExcludedLetters] = useState<string[]>([])
    let [includedLetters, setIncludedLetters] = useState<IIncludedLetter[]>(initIncludeLetters)
    let [filter, setFilter] = useState('')


    useEffect(() => {
        let wl: string[] = [];
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                wl = text.split(/\n/)
            }).finally(() => {
            setWords(wl)
            setFilteredWords(WordFilter(wl, excludedLetters, includedLetters))
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const WordFilter = (words: string[], excludedLetters: string[], includedLetters: IIncludedLetter[], filter?: string): string[] => {
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

    const WordContainsLetters = (word: string, letters: IIncludedLetter[]): boolean => {
        const lList = letters.filter(x => x.letter.length > 0)
        let retval = false;
        let hasLetter = false;
        if (lList.length === 0) {
            return true;
        } else {
            for (const l of lList) {
                hasLetter = word.includes(l.letter);
                // doesnt include letter
                if (!hasLetter) {
                    return false;
                }
                // position is incorrect
                else if (!l.correctPos && word[l.pos] === l.letter) {
                    return false;
                }
                // position is correct
                else if (l.correctPos && word[l.pos] !== l.letter) {
                    return false;
                } else {
                    retval = true;
                }
            }

            return retval;
        }
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
