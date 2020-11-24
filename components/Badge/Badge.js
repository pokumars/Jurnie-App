import React from 'react';
import { StyleSheet } from 'react-native';

import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import { Emperor } from 'components/Colors';
import { InlineXXL, StackXXS } from 'components/Spacing';
import { BoldText, TextS } from 'components/Text';

/**
 *
 * @param {number|string} prop.numberOfTheSameBadge How many times has auser won the badge
 * @param {string} prop.badgeImage - image that goes directly into react native's Image source
 * either require('../../logo.png') or {uri: 'https://smth.dev/logo.png'}
 *
 */
const Badge = ({ numberOfTheSameBadge, badgeImage, isReachievable }) => {
  return (
    <BadgeContainer>
      <FastImage source={badgeImage} style={styles.badgeImage} />
      {isReachievable && (
        <NumberOfTheSameBadgeText>
          {numberOfTheSameBadge}
        </NumberOfTheSameBadgeText>
      )}
    </BadgeContainer>
  );
};

const BadgeContainer = styled.View`
  align-items: center;
  justify-content: flex-start;
  max-width: ${InlineXXL}px;
`;

const NumberOfTheSameBadgeText = styled(BoldText)`
  font-size: ${TextS}px;
  color: ${Emperor};
  margin-top: ${StackXXS}px;
`;

const styles = StyleSheet.create({
  badgeImage: {
    width: InlineXXL,
    height: InlineXXL,
  },
});

export default Badge;
