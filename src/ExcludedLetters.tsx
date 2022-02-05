import React from "react";
import {Box, Container, Form, Heading, Section} from "react-bulma-components";
import {Helpers} from "./Helpers";

function ExcludedLetters(props: {
    excludedLetters: string[];
    onChange: (val: string[]) => void;
}) {
    return <Section>
        <Container>
            <Box>
                <Heading>
                    Excluded Letters
                </Heading>
                <Form.Field>
                    <Form.Control>
                        <Form.Textarea
                            value={props.excludedLetters.join('')}
                            placeholder="Excluded Letters"
                            onChange={(e) => {
                                props.onChange(Array.from(Helpers.Unrepeated(e.target.value)))
                            }
                            }
                        />
                    </Form.Control>
                </Form.Field>
            </Box>
        </Container>
    </Section>;
}

export {ExcludedLetters}
