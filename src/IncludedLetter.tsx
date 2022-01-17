import React from "react";
import {Box, Container, Form, Heading, Section} from "react-bulma-components";
import {IIncludedLetter} from "./Models/Models";

function IncludedLetters(props: {
    includedLetters: IIncludedLetter[],
    onChange: (val: IIncludedLetter[]) => void;
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
    includedLetter: IIncludedLetter;
    onChange: (val: IIncludedLetter) => void;
}) {


    return <><Form.Field>
        <Form.Control>
            <Form.Input
                maxLength={1}
                onChange={(e) => {
                    const il = props.includedLetter;
                    il.letter = e.target.value;
                    props.onChange(il);
                }}
            />
        </Form.Control>

    </Form.Field>
        <Form.Field>
            <Form.Control>
                <Form.Checkbox
                    checked={props.includedLetter.correctPos}
                    onChange={(e) => {
                        const il = props.includedLetter;
                        il.correctPos = e.target.checked;
                        props.onChange(il);
                    }}
                >
                    Correct Position
                </Form.Checkbox>
            </Form.Control>
        </Form.Field>
    </>;
}

export {IncludedLetters}
