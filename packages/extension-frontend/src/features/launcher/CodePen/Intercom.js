import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import ControlPanel from '../ControlPanel';

const Container = styled.div`
  .intercom-date__divider:before {
    content: '/';
  }

  .intercom-base {
    position: fixed;
    right: 20px;
    bottom: 100px;
    background: #fff;
    width: 370px;
    height: 100%;
    max-height: 670px;
    border-radius: 8px;
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
    overflow: hidden;
  }

  .intercom-header {
    display: block;
    background: #1f8ceb;
    height: 250px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  .intercom-list__item {
    display: flex;
    flex-diretion: row;
    flex-wrap: nowrap;
    padding: 32px 30px;
    border-bottom: 1px solid #f3f4f5;
  }

  .intercom-message--trim .intercom__content {
    width: 255px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .intercom-user--avatar {
    width: 40px;
    max-width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 15px;
    overflow: hidden;
  }
  .intercom-user--avatar img {
    display: block;
    width: 100%;
  }
`;

const initMessages = [
  {
    read: true,
    messages: [
      {
        date: new Date(2016, 7, 10, 5, 1),
        user: 'John Doe',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illud dico, ea, quae dicat, praeclare inter se cohaerere.'
      },
      {
        date: new Date(2016, 7, 11, 20, 1),
        user: 'Jane Doe',
        message: 'Illud dico, ea, quae dicat, praeclare inter se cohaerere.'
      },
      {
        date: new Date(),
        user: 'Jane Doe',
        message: 'Praeclare inter se cohaerere.'
      }
    ]
  },
  {
    read: true,
    messages: [
      {
        date: new Date(2016, 7, 5, 5, 1),
        user: 'John Doe',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illud dico, ea, quae dicat, praeclare inter se cohaerere.'
      },
      {
        date: new Date(2016, 7, 5, 40, 1),
        user: 'Jane Doe',
        message: 'Illud dico, ea, quae dicat, praeclare inter se cohaerere.'
      },
      {
        date: new Date(2016, 7, 8, 40, 1),
        user: 'Jane Doe',
        message: 'Praeclare inter se cohaerere.'
      },
      {
        date: new Date(),
        user: 'John Doe',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illud dico, ea, quae dicat, praeclare inter se cohaerere.'
      }
    ]
  }
];
/**
 * <Intercom />
 */
export default class Intercom extends React.Component {
  static propTypes = {
    messages: PropTypes.array
  };

  static defaultProps = {
    messages: initMessages
  };

  constructor(props) {
    super(props);

    const {
      props: { messages }
    } = this;

    this.state = {
      active: false,
      messages
    };
  }

  handleClick = () => {
    this.setState(state => ({
      active: !state.active
    }));
  };

  render() {
    const { active, messages } = this.state;

    return (
      <Container>
        <div className="intercom">
          {active ? <ControlPanel active={active} /> : false}

          <Button
            active={active}
            count={messages.length}
            onClick={this.handleClick}
          />
        </div>
      </Container>
    );
  }
}
