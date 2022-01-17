import React from "react";
import {Box, Container, Content, Heading, Section} from "react-bulma-components";

function PossibleWords(props: {
    words: string[]
}) {

    return <Section>
        <Container>
            <Box>
                <Heading>
                    {`Possible Words ${props.words.length > 0 ? "(" + props.words.length + ")" : ""}`}
                </Heading>
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
