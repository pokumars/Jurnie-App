import React from 'react';
import { StyleSheet, Text } from 'react-native';

import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import { Emperor } from 'components/Colors';
import { InlineXXL, StackXS, StackXXS } from 'components/Spacing';
import { BoldText, TextXXS } from 'components/Text';

/**
 *
 * @param {number|string} prop.numberOfTheSameBadge How many times has auser won the badge
 * @param {string} prop.badgeImage - image that goes directly into react native's Image source
 * either require('../../logo.png') or {uri: 'https://smth.dev/logo.png'}
 * @param {string} prop.badgeName a name that goes under the image that gives an idea of what the achievement was
 * @param {Boolean} prop.isReachievable - is it a badh´ge the user can win again. to determin whether
 * to display how many times theuser has won that badge
 */
const Badge = ({ numberOfTheSameBadge, badgeImage, isReachievable, badgeName }) => {
  return (
    <BadgeContainer>
      <FastImage source={{ uri: badgeImage }} style={styles.badgeImage} />
      {isReachievable && (
        <NumberOfTheSameBadgeText numberOfLines={1}>
          {numberOfTheSameBadge}
        </NumberOfTheSameBadgeText>
      )}
      <Text>{badgeName}</Text>
    </BadgeContainer>
  );
};

const BadgeContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: flex-start;
  padding: ${StackXS / 2}px;
`;

const NumberOfTheSameBadgeText = styled(BoldText)`
  font-size: ${TextXXS}px;
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
