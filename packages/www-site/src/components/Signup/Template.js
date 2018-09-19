import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  opacity: 0.2;
  z-index: 1;
  height: 100%;
  overflow: hidden;

  section {
    grid-area: main;
    margin: 64px 15%;
    display: grid;
    grid-template-areas: '. .';
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  .section {
    display: flex;
    flex-direction: column;
  }

  .skeleton {
    background-color: #e6e6e6;
    height: 100%;
    width: 100%;
  }

  .h1 {
    height: 42px;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 50px;
  }

  .p {
    height: 18px;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 30px;
  }

  .button {
    height: 60px;
    width: 100%;
    border-radius: 30px;
    margin: 30px 0;
  }

  .avatar {
    width: 187px;
    height: 187px;
    border-radius: 50%;
    margin: 24px 0;
    align-self: center;
  }

  .box {
    height: 121px;
    width: 121px;
    align-self: flex-end;
  }
`

const Template = () => (
  <Background>
    <main>
      <header>
        <div className="skeleton" />
      </header>
      <section>
        <div className="section">
          <div className="h1 skeleton round" />
          <div className="p skeleton round" />
          <div className="p skeleton round" />
          <div className="p skeleton round" />
          <div className="p skeleton round" />
          <div className="button skeleton round" />
        </div>
        <div className="section">
          <div className="avatar skeleton round" />
          <div className="box skeleton round" />
        </div>
      </section>
      <footer>
        <div className="skeleton" />
      </footer>
    </main>
  </Background>
)

export default Template
