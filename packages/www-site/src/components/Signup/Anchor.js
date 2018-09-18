import { Anchor } from '@diff/shared-components'
import styled from 'styled-components'

const SignupAnchor = styled(Anchor)`
  padding: 15px 45px;
  border-radius: 100px;
  border: 0px;
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700 !important;
  cursor: pointer;
  text-decoration: none;
  height: unset;
  background-color: #43cad9;
  color: #fff;

  &:hover {
    text-decoration: none;
  }
`

export default SignupAnchor
