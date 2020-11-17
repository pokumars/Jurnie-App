import styled from 'styled-components/native';

import { White } from '../Colors';

export const DefaultCard = styled.View`
  border-radius: 12px;
  background-color: ${(props) => props.backgroundColor || White};
`;
