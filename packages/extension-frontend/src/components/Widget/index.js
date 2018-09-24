import { isNil } from 'lodash';

export { default } from './Widget.container';

export const ImplAuthenticated = props => !!props.token;

export const ImplUnAuthenticated = props => isNil(props.token);
