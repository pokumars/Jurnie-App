import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const ScreenWidth = Math.round(Dimensions.get('window').width);
export const ScreenHeight = Math.round(Dimensions.get('window').height);

export const InlineXS = ScreenWidth / 100;
export const InlineXXS = InlineXS / 2;
export const InlineXXXS = InlineXXS / 2;
export const InlineS = InlineXS * 2;
export const InlineM = InlineS * 2;
export const InlineL = InlineM * 2;
export const InlineXL = InlineL * 2;
export const InlineXML = InlineL * 1.5;
export const InlineXXL = InlineL * 2;
export const InlineXXXL = InlineL * 4;

export const StackXS = ScreenHeight / 100;
export const StackXXS = StackXS / 2;
export const StackMS = StackXS * 1.5;
export const StackS = StackXS * 2;
export const StackM = StackS * 2;
export const StackML = StackM * 1.5;
export const StackL = StackM * 2;
export const StackXL = StackL * 2;
export const StackXXL = StackXL * 2;

export const VerticalSpacing = styled.View`
  height: ${(props) => props.size};
`;

export const HorizontalSpacing = styled.View`
  width: ${(props) => props.size};
`;

export const Column = css`
  flex-direction: column;
`;

export const Row = css`
  flex-direction: row;
`;

export const Center = css`
  align-items: center;
  justify-content: center;
`;

export const DefaultContainer = css`
  padding-right: ${InlineM}px;
  padding-left: ${InlineM}px;
`;
