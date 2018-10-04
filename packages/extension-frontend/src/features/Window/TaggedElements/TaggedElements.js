import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Space = styled.div`
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
`;

const TaggedElementsRow = styled(Space)`
  color: ${props => (props.present ? '#000' : 'red')};
  padding: var(--space-2) var(--space-3);
  margin-bottom: var(--space-2);
  cursor: pointer;
  &:hover {
    color: var(--color-purple);
    background-color: rgba(0, 0, 255, 0.1);
  }
`;

const Layout = styled.div``;

export default class TaggedElements extends React.Component {
  static propTypes = {
    tagged: PropTypes.array
  };

  static defaultProps = {
    tagged: []
  };

  isPresent = tag => !!document.querySelectorAll(tag).length > 0;

  outline = tag => evt => {
    const elements = document.querySelectorAll(tag);
    if (elements.length > 0) {
      elements.forEach(element => {
        element.style.outline = '1px solid purple';
        element.style.boxShadow = '0px 0px 99999px 99999px rgba(0,0,0,0.3)';
        element.style.zIndex = 99999999999;
        element.style.position = 'relative';
      });
    }
  };

  removeOutline = tag => evt => {
    const elements = document.querySelectorAll(tag);
    if (elements.length > 0) {
      elements.forEach(element => {
        element.style.outline = 'initial';
        element.style.boxShadow = 'unset';
        element.style.zIndex = 1;
      });
    }
  };

  render() {
    const {
      props: { tagged },
      outline,
      removeOutline,
      isPresent
    } = this;
    return (
      <Layout>
        {tagged.length === 0 && <label>Empty</label>}
        {tagged.length > 0 &&
          tagged.map((tag, idx) => {
            const present = isPresent(tag);

            return (
              <TaggedElementsRow
                key={idx}
                present={present}
                onMouseEnter={outline(tag)}
                onMouseLeave={removeOutline(tag)}
              >
                {tag}
              </TaggedElementsRow>
            );
          })}
      </Layout>
    );
  }
}
