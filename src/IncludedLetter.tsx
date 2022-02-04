import React from "react";
import {Box, Container, Form, Heading, Section} from "react-bulma-components";
import {IIncludedLetters} from "./Models/Models";

const unrepeated = (str: string): string => {
    return Array.from(new Set(str)).join('')
};


function IncludedLetters(props: {
    includedLetters: IIncludedLetters[],
    onChange: (val: IIncludedLetters[]) => void;
}) {
    return <Section>
        <Container>
            <Box>
                <Heading>
                    Included Letters
                </Heading>
                <form>
                    {
                        props.includedLetters.map((l, i) => {
                            return <IncludedLetter
                                key={i}
                                placeHolderText={`Position ${(i + 1).toString()}`}
                                includedLetter={l}
                                onChange={(val) => {
                                    const ils = props.includedLetters;
                                    const il = ils[i];
                                    Object.assign(il, val);
                                    props.onChange(ils)
                                }}
                            />
                        })
                    }
                </form>
            </Box>
        </Container>
    </Section>
}

function IncludedLetter(props: {
    includedLetter: IIncludedLetters;
    onChange: (val: IIncludedLetters) => void;
    placeHolderText: string;
}) {


    return <>
        <Form.Field>
            <Form.Control>
                <Form.Input
                    value={props.includedLetter.letters}
                    placeholder={props.placeHolderText}
                    onChange={(e) => {
                        const val = e.target.value.replaceAll(' ', '').toLowerCase();
                        const il = props.includedLetter;
                        il.letters = unrepeated(val);
                        props.onChange(il);
                    }}
                />
            </Form.Control>

        </Form.Field>
        <Form.Field>
            <Form.Control style={CheckBoxStyle}>
                <Form.Checkbox
                    checked={props.includedLetter.correctPos}
                    onChange={(e) => {
                        const il = props.includedLetter;
                        il.correctPos = e.target.checked;
                        // if (il.letters.length > 1) {
                        //     il.letters = props.includedLetter.letters.slice(0, 1);
                        // }
                        props.onChange(il);
                    }}
                >
                    Correct Position
                </Form.Checkbox>
                {
                    (props.includedLetter.correctPos && props.includedLetter.letters.length > 1) &&
                    <Form.Help color="danger">Only 1 Letter can be in the correct position</Form.Help>
                }

            </Form.Control>
        </Form.Field>
    </>;
}

const CheckBoxStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
}

export {IncludedLetters}
