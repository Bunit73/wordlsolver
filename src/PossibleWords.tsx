import React from "react";
import {Box, Container, Content, Form, Heading, Section} from "react-bulma-components";

function PossibleWords(props: {
    words: string[],
    filterChange: (val: string) => void;
}) {

    return <Section>
        <Container>
            <Box>
                <Heading>
                    {`Possible Words ${props.words.length > 0 ? "(" + props.words.length + ")" : ""}`}
                </Heading>
                <Content>
                    <form>
                        <Form.Field>
                            <Form.Control>
                                <Form.Input
                                    placeholder={"Filter List"}
                                    onChange={(e) => {
                                        props.filterChange(e.target.value);
                                    }}
                                />
                            </Form.Control>
                        </Form.Field>
                    </form>
                </Content>
                <Content style={{
                    maxHeight: "600px",
                    overflow: 'scroll',

                }}>
                    {
                        props.words.map((w, i) => {
                            return <div key={i}>{
                                <span>{`${w}`}</span>
                            }</div>
                        })
                    }
                </Content>
            </Box>
        </Container>

    </Section>;
}

export {PossibleWords}
