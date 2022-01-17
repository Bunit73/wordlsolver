import React from "react";
import {Box, Container, Form, Heading, Section} from "react-bulma-components";

function ExcludedLetters(props: {
    excludedLetters: string[];
    onChange: (val: string[]) => void;
}){
    return <Section>
        <Container>
            <Box>
                <Heading>
                    Excluded Letters
                </Heading>
                <Form.Field>
                    <Form.Control>
                        <Form.Textarea
                            placeholder="Excluded Letters"
                            onChange={(e) => {
                                props.onChange(Array.from(e.target.value))
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
