import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';

import { Black } from '../Colors';
import { StackS } from '../Spacing';

const ScreenWidth = Math.round(Dimensions.get('window').width);
export const TextXXL = ScreenWidth * 0.09;
export const TextXL = ScreenWidth * 0.08;
export const TextL = ScreenWidth * 0.07;
export const TextM = ScreenWidth * 0.06;
export const TextS = ScreenWidth * 0.05;
export const TextXS = ScreenWidth * 0.045;
export const TextXXS = ScreenWidth * 0.04;
export const TextXXXS = ScreenWidth * 0.035;
export const TextXXXXS = ScreenWidth * 0.025;

export const SubtitleText = styled.Text`
  color: ${Black};
  font-size: ${TextXXXS}px;
  opacity: 0.5438;
  margin-bottom: ${(props) => props.marginBottom || StackS}px;
`;

export const BoldText = styled.Text`
  font-weight: 700;
`;
