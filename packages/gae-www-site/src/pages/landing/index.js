import React from 'react';
import styled from 'styled-components';
import { Header } from '@diff/shared-components';
import { Button } from '../../components/site-components';
import Layout from '../../components/Layout';
import ModalForm from './Modal';

import CommentFeature from './features/Comment';
import AttachFeature from './features/Attach';
import TrackFeature from './features/Track';

import DiffHeader from './diff.gif';
import DiffLogo from './diff.svg';
import DiffDarkLogo from './diff2.svg';

if (typeof window !== 'undefined') {
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
    console.log('Cache cleared');
  }
}

const Container = styled.div`
  color: #130c3b;
  padding-top: 32px;
  grid-template-areas:
    'header'
    'maintext'
    'hero'
    'features'
    'cta'
    'footer';
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

  @media (max-width: 575.98px) {
    h1 {
      font-size: 56px !important;
      line-height: 1.2;
    }

    h3 {
      font-size: 32px !important;
    }

    p {
      font-size: 24px;
    }
  }
`;
const Feature = styled.div`
  text-align: center;

  margin-bottom: 120px;
  @media (max-width: 575.98px) {
    margin-bottom: 96px;
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

const FeatureGridArea = styled(GridArea)`
  grid-area: features;
  display: block;
`;

const CTAGridArea = styled(GridArea)`
  grid-area: cta;
  justify-content: center;
  align-items: center;
  flex: 1;
  display: flex;
`;

const HeaderGridArea = styled(GridArea)`
  grid-area: maintext;
  text-align: center;
  margin: 90px auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: relative;

  @media (max-width: 575.98px) {
    margin: 0 auto;
    margin-bottom: 32px;
  }
`;

const FloatingLogo = styled.img`
  position: absolute;
  right: ${props => (props.secondary ? '-500px' : '-450px')};
  max-height: 800px;
  min-height: 800px;
  height: 800px;
  top: ${props => (props.secondary ? '300px' : '200px')};
`;

export default class Landing extends React.Component {
  state = {
    open: false,
    feature: null
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const urlParams = new window.URLSearchParams(window.location.search);
      const feature = urlParams.has('feature')
        ? urlParams.get('feature')
        : 'annotate';
      this.setState({ feature });
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  renderDiffText = () => (
    <React.Fragment>
      <Header as="h1">Track changes in your web app</Header>
    </React.Fragment>
  );

  renderDesignOpsText = () => (
    <React.Fragment>
      <Header as="h1">Agile and design don’t mix</Header>
      <Header as="h2">Diff helps your team to scale design ops </Header>
      <p>Learn more about designs ops</p>
    </React.Fragment>
  );

  renderAnnotateText = () => (
    <React.Fragment>
      <Header as="h1">Annotate anything in your web application</Header>
      <p style={{ textAlign: 'center' }}>
        Keep designers and developers in sync realtime
      </p>
    </React.Fragment>
  );

  render() {
    const {
      state: { open, feature },
      renderDiffText,
      renderDesignOpsText,
      renderAnnotateText
    } = this;

    return (
      <Layout
        client
        rightMenuItem={() => (
          <Button onClick={this.onOpenModal}>Get early access</Button>
        )}
      >
        <Container className="container">
          <FloatingLogo src={DiffLogo} alt="svg" />
          <FloatingLogo secondary src={DiffDarkLogo} alt="svg" />
          <HeaderGridArea>
            {feature === 'diffs' && renderDiffText()}
            {feature === 'design' && renderDesignOpsText()}
            {feature === 'annotate' && renderAnnotateText()}
          </HeaderGridArea>
          <GridArea
            name="hero"
            style={{
              marginBottom: '120px',
              position: 'relative',
              display: 'flex'
            }}
          >
            <img
              style={{
                margin: '0 auto',
                zIndex: 2,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              src={DiffHeader}
              alt="Diff giff"
            />
          </GridArea>
          <FeatureGridArea>
            <Feature>
              <CommentFeature />
            </Feature>
            <Feature>
              <AttachFeature />
            </Feature>
            <Feature>
              <TrackFeature />
            </Feature>
          </FeatureGridArea>
          <CTAGridArea>
            <Button size="xl" onClick={this.onOpenModal}>
              Get early access
            </Button>
          </CTAGridArea>
          <div style={{ gridArea: 'footer', textAlign: 'center' }}>
            <small className="d-block mb-3 text-muted">
              &copy;2018 getDiff, Inc.
            </small>
          </div>
        </Container>
        <ModalForm
          open={open}
          feature={feature}
          onCloseModal={this.onCloseModal}
          onComplete={this.onCloseModal}
        />
      </Layout>
    );
  }
}
