import React, {useEffect, useState} from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import {Box, Button, Columns, Container} from "react-bulma-components";
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
    }, [])

    const WordFilter = (words: string[], excludedLetters: string[], includedLetters: IIncludedLetter[]): string[] => {
        let nwl: string[] = [];
        let excluded = true;
        let found = false;

        for (const w of words) {

            excluded = WordExcludesLetters(w, excludedLetters);
            found = WordContainsLetters(w, includedLetters)

            if (excluded && found) {
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
                if(!hasLetter) {
                    return false;
                }
                // position is incorrect
                else if(!l.correctPos && word[l.pos] === l.letter){
                    return false;
                }
                // position is correct
                else if(l.correctPos && word[l.pos] !== l.letter){
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
            <Container>
                <Columns>
                    <Columns.Column>
                        <PossibleWords
                            words={filteredWords}
                        />
                    </Columns.Column>
                    <Columns.Column>
                        <IncludedLetters
                            includedLetters={includedLetters}
                            onChange={(val) => {
                                setIncludedLetters(val)
                                setFilteredWords(WordFilter(words,excludedLetters, val))
                            }}/>
                        <ExcludedLetters
                            excludedLetters={excludedLetters}
                            onChange={(val) => {
                                const eL = Array.from(new Set(val));
                                setExcludedLetters(eL)
                                setFilteredWords(WordFilter(words,eL, includedLetters))
                            }}
                        />
                    </Columns.Column>
                </Columns>
            </Container>
        </div>
    );
}

export default App;
