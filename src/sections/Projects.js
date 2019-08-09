import React from 'react';
import PropTypes from 'prop-types';
import { Text, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';

import ReactMarkdown from 'react-markdown';
import markdownRenderer from '../components/MarkdownRenderer';

const Background = () => (
  <div>
    <Triangle
      color="primaryDark"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="background"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertX
    />

    <Triangle
      color="secondaryDark"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const CARD_HEIGHT = '100%';

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 2px solid;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 2));
  }
`;

const Project = ({ name, description, type }) => (
  <Card p={0}>
    <Flex style={{ height: CARD_HEIGHT }}>
      <TextContainer style={{ padding: '2em' }}>
        <span style={{ marginBottom: '1em' }}>
          <Title my={1} pb={3}>
            {name}
          </Title>
        </span>
        <Text width={[1]} style={{ overflow: 'auto' }}>
          <ReactMarkdown
            source={description.childMarkdownRemark.rawMarkdownBody}
            renderers={markdownRenderer}
          />
        </Text>
        <ImageSubtitle bg="primary" color="white" y="bottom" x="right" round>
          {type}
        </ImageSubtitle>
      </TextContainer>
    </Flex>
  </Card>
);

Project.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  logo: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
    title: PropTypes.string,
  }).isRequired,
};

const Projects = () => (
  <Section.Container id="projects" Background={Background}>
    <Section.Header name="Projects" />
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
          contentfulAbout {
            projects {
              id
              name
              description {
                childMarkdownRemark {
                  rawMarkdownBody
                }
              }
              projectUrl
              publishedDate(formatString: "YYYY")
              type
              logo {
                title
                image: resize(quality: 100) {
                  src
                }
              }
            }
          }
        }
      `}
      render={({ contentfulAbout }) => (
        <CardContainer>
          {contentfulAbout.projects.map((p, i) => (
            <Fade bottom delay={i * 200} key={p.id}>
              <Project {...p} />
            </Fade>
          ))}
        </CardContainer>
      )}
    />
  </Section.Container>
);

export default Projects;
