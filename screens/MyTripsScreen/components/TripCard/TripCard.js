import React from 'react';

import styled from 'styled-components/native';

import { Mariner, Silver, White } from 'components/Colors';
import { InlineM, InlineL, Row, StackXS, StackS } from 'components/Spacing';
import { BoldText } from 'components/Text';

/**
 *
 * @param {string} prop.destination - name of the location of destination
 * @param {string} prop.origin - name of the location of origin
 *
 *
 */

const TripCard = ({
  endingTime,
  feed,
  transportMode,
  onFeedbackButtonPress,
  onTripCardPress,
  startingTime,
}) => {
  return (
    <TripCardContainer onPress={onTripCardPress}>
      <TripInfo {...{ endingTime, startingTime, transportMode }} />
      <FeedbackButton
        label={feed ? 'update feed' : 'feedback'}
        onPress={onFeedbackButtonPress}
      />
    </TripCardContainer>
  );
};

const TripCardContainer = styled.TouchableOpacity`
  ${Row};
  align-items: center;
  background-color: ${Silver};
  border-radius: 12px;
  margin-bottom: ${StackS}px;
  padding: ${InlineM}px;
`;

const TripInfo = ({ endingTime, startingTime, transportMode }) => (
  <TripInfoContainer>
    <StartingTimeText>{startingTime}</StartingTimeText>
    <MeansOfTransportText>
      {getMeansOfTransport(transportMode)}
    </MeansOfTransportText>
    <EndingTimeText>{endingTime}</EndingTimeText>
  </TripInfoContainer>
);

const TripInfoContainer = styled.View`
  ${Row};
  flex: 2;
  justify-content: space-between;
  margin-right: ${InlineL}px;
`;

const StartingTimeText = styled(BoldText)``;
const MeansOfTransportText = styled.Text``;
const EndingTimeText = styled(BoldText)``;

const getMeansOfTransport = (activity) => {
  switch (activity) {
    case 'stationary':
      return 'stationary';

    case 'non-motorized/bicycle':
      return 'bicycle';

    case 'non-motorized/pedestrian':
      return 'pedestrian';

    case 'non-motorized/pedestrian/walk':
      return 'walk';

    case 'non-motorized/pedestrian/run':
      return 'run';

    case 'motorized/road/car':
      return 'car';

    case 'motorized/road/bus':
      return 'bus';

    case 'motorized/rail':
      return 'rail';

    case 'motorized/rail/tram':
      return 'tram';

    case 'motorized/rail/train':
      return 'train';

    case 'motorized/rail/metro':
      return 'metro';

    case 'motorized/air/plane':
      return 'plain';

    default:
      return 'unknown';
  }
};

const FeedbackButton = ({ label, onPress }) => (
  <FeedbackButtonContainer {...{ onPress }}>
    <FeedbackButtonLabel>{label.toUpperCase()}</FeedbackButtonLabel>
  </FeedbackButtonContainer>
);

const FeedbackButtonContainer = styled.TouchableOpacity`
  background-color: ${Mariner};
  border-radius: 4px;
  padding: ${StackXS}px 0;
  flex: 1;
`;

const FeedbackButtonLabel = styled.Text`
  color: ${White};
  text-align: center;
`;

export default TripCard;
