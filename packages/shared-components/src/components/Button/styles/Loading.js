import React from "react";
import styled from "styled-components";

const ButtonLoader = styled.div`
  width: 70px;
  text-align: center;
  justify-content: center;
  display: flex;
  width: 100%;

  div {
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background-color: #fff;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1s infinite ease-in-out both;
    animation: sk-bouncedelay 1s infinite ease-in-out both;
  }

  .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

const ButtonLoaderImpl = () => (
  <ButtonLoader>
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </ButtonLoader>
);

export default ButtonLoaderImpl;
