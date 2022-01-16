import React, {useEffect, useState} from "react";
import {Container, Form, Section} from "react-bulma-components";

function ExcludedLetters(props: {
    excludedLetters: string[];
    onChange: (val: string[]) => void;
}){
    return <div>
        <Section>
            <Container>
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
            </Container>
        </Section>
    </div>;
}

export {ExcludedLetters}
