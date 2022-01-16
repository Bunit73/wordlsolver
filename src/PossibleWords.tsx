import React from "react";
import {Container, Content, Heading, Hero, Section} from "react-bulma-components";

function PossibleWords(props: {
    words: string[]
}) {

    return <div><Hero>

        <Hero.Header renderAs="header">Possible Words</Hero.Header>
        <Hero.Body>
            <Section>
                <Container>
                    <Heading subtitle>Section</Heading>
                    <Content style={{
                        maxHeight: "200px",
                        overflow: 'scroll'
                    }}>
                        {
                            props.words.map((w, i) => {
                                return <div key={i}>{
                                    <span>{`${w}`}</span>
                                }</div>
                            })
                        }
                    </Content>
                </Container>

            </Section>
        </Hero.Body>

        <Hero.Footer>Footer</Hero.Footer>

    </Hero></div>;
}

export {PossibleWords}
