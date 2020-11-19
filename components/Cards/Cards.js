import styled from 'styled-components/native';

import { White } from '../Colors';
import { InlineM } from '../Spacing';

export const DefaultCard = styled.View`
  border-radius: 12px;
  background-color: ${(props) => props.backgroundColor || White};
  padding: ${InlineM}px;
`;
