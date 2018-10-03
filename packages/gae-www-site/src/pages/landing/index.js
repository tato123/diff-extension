import React from 'react';
import styled from 'styled-components';
import { Header } from '@diff/shared-components';
import { Button } from '../../components/site-components';
import Layout from '../../components/Layout';
import ModalForm from './Modal';

const Container = styled.div`
  color: #130c3b;
  padding-top: 32px;
  grid-template-areas:
    'header'
    'maintext'
    'hero'
    'features'
    'cta';
  font-size: 1rem;

  h1 {
    font-size: 72px;
    line-height: 1.1;
    letter-spacing: -3px;
  }

  h3 {
    font-size: 48px;
  }

  p {
    font-size: 32px;
    font-weight: 300;
    line-height: 1.4;
  }
`;

const GridArea = styled.div`
  grid-area: ${props => props.name};
  margin-bottom: 32px;
`;

const PlaceholderImg = styled.div`
  width: 100%;
  height: 500px;
  background-color: #ccc;
  border-radius: 8px;
`;

const Feature = styled.div``;

const HeaderGridArea = styled(GridArea)`
  display: flex;
  justify-content: center;
  position: relative;

  img {
    height: 50px;
    width: auto;
  }
  button {
    position: absolute;
    right: 0px;
  }
`;

const FeatureGridArea = styled(GridArea)`
  grid-area: features;
  display: grid;
  display: flex;
`;

const CTAGridArea = styled(GridArea)`
  grid-area: cta;
  justify-content: center;
  align-items: center;
  flex: 1;
  display: flex;
`;

export default class Landing extends React.Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      state: { open }
    } = this;

    return (
      <Layout
        client
        rightMenuItem={() => (
          <Button onClick={this.onOpenModal}>Get early access</Button>
        )}
      >
        <Container className="container">
          <GridArea
            name="maintext"
            style={{
              textAlign: 'center',
              margin: '90px auto',
              maxWidth: '800px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Header as="h1">Annotate anything in your web application</Header>
            <p style={{ textAlign: 'center' }}>
              Keep designers and developers in sync realtime
            </p>
          </GridArea>
          <GridArea name="hero" style={{ marginBottom: '120px' }}>
            <PlaceholderImg />
          </GridArea>
          <FeatureGridArea className="row">
            <Feature className="col">
              <Header as="h3">Comment</Header>
              <p>Create and view comments in realtime from your entire team</p>
            </Feature>
            <Feature className="col">
              <Header as="h3">Track</Header>
              <p>Tracks every design change in your HTML and CSS</p>
            </Feature>
            <Feature className="col">
              <Header as="h3">Attach</Header>
              <p>
                Target specific page elements and directly share design assets
              </p>
            </Feature>
          </FeatureGridArea>
          <CTAGridArea>
            <Button onClick={this.onOpenModal}>Get early access</Button>
          </CTAGridArea>
        </Container>
        <ModalForm
          open={open}
          onCloseModal={this.onCloseModal}
          onComplete={this.onCloseModal}
        />
      </Layout>
    );
  }
}
