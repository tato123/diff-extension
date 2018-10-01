import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import mark from '../components/images/mark.png'

const Container = styled.div`
  padding-top: 32px;
  grid-template-areas:
    'header'
    'maintext'
    'hero'
    'features'
    'cta';
  font-size: 1rem;
`

const GridArea = styled.div`
  grid-area: ${props => props.name};
  margin-bottom: 32px;
`

const PlaceholderImg = styled.div`
  width: 100%;
  height: 500px;
  background-color: #ccc;
  border-radius: 8px;
`

const Feature = styled.div``

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
`

const FeatureGridArea = styled(GridArea)`
  grid-area: features;
  display: grid;
  display: flex;
`

const CTAGridArea = styled(GridArea)`
  grid-area: cta;
  justify-content: center;
  align-items: center;
  flex: 1;
  display: flex;
`

const Landing = () => (
  <Container className="container">
    <HeaderGridArea name="header">
      <img src={mark} className="d-inline-block align-top" alt="" />
      <button
        class="primary button btn-info"
        style={{
          width: '200px',
          fontSize: '12px',
        }}
      >
        Get early access
      </button>
    </HeaderGridArea>
    <GridArea name="maintext" style={{ textAlign: 'center' }}>
      <h1>Annotate anything on your web application</h1>
      <h2>Keep designers and developers in sync realtime</h2>
    </GridArea>
    <GridArea name="hero">
      <PlaceholderImg />
    </GridArea>
    <FeatureGridArea className="row">
      <Feature className="col">
        <h1>Comment</h1>
        <p>Create and view comments in realtime from your entire team</p>
      </Feature>
      <Feature className="col">
        <h1>Track</h1>
        <p>Tracks every design change in your HTML and CSS</p>
      </Feature>
      <Feature className="col">
        <h1>Attach</h1>
        <p>Target specific page elements and directly share design assets</p>
      </Feature>
    </FeatureGridArea>
    <CTAGridArea>
      <button class="primary button btn-info">Get early access</button>
    </CTAGridArea>
  </Container>
)

export default Landing
