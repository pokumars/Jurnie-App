import React from 'react';
import styled from 'styled-components';

import { ButtonContainer, ButtonWrapper } from 'components/Button';
import { DefaultCard } from 'components/Cards';
import {
  HawaiianTan,
  MangoTango,
  MineShaft,
  Rajah,
  RoyalBlue,
} from 'components/Colors';
import { BoldText, SubtitleText, TextXXS, TextXXXXS } from 'components/Text';
import {
  Center,
  DefaultContainer,
  InlineM,
  InlineL,
  Row,
  StackM,
} from 'components/Spacing';
import TransportTile from 'components/TransportTile';

import { MEANS_OF_TRANSPORT } from 'app-constants';
import Icon from '../../components/Icon/Icon';

const HomeScreen = ({ navigation }) => {
  const defaultValues = {
    meansOfTransport: MEANS_OF_TRANSPORT.BUS,
  };

  const onWriteFeedbackButtonPress = () => {};

  return (
    <ScreenContainer>
      <LastTrip {...{ onWriteFeedbackButtonPress }} />
    </ScreenContainer>
  );
};

const ScreenContainer = styled.View`
  ${DefaultContainer};
  padding-top: ${StackM}px;
`;

const LastTrip = ({ onWriteFeedbackButtonPress }) => (
  <>
    <SubtitleText>LAST TRIP</SubtitleText>
    <LastTripCard>
      <MeansOfTransportText>On Bus</MeansOfTransportText>
      <TransportTile
        source={require('assets/icons/bus-white.png')}
        backgroundColor={HawaiianTan}
      />
      <FeedbackButton onPress={onWriteFeedbackButtonPress} />
    </LastTripCard>
  </>
);

const FeedbackButton = ({ onPress }) => (
  <FeedbackButtonWrapper {...{ onPress }}>
    <FeedbackButtonContainer>
      <Icon
        size={FeedbackIconSize}
        source={require('assets/icons/feedback.png')}
        tintColor={RoyalBlue}
      />
    </FeedbackButtonContainer>
    <FeedbackButtonText>Write feedback</FeedbackButtonText>
  </FeedbackButtonWrapper>
);

const MeansOfTransportText = styled(BoldText)`
  color: ${MineShaft};
  font-size: ${TextXXS}px;
`;

const FeedbackButtonText = styled.Text`
  color: ${MineShaft};
  font-size: ${TextXXXXS}px;
`;

const LastTripCard = styled(DefaultCard)`
  ${Row}
  align-items: center;
  background-color: ${Rajah};
  justify-content: space-between;
  padding: ${InlineM}px;
`;

const FeedbackButtonWrapper = styled(ButtonWrapper)`
  ${Center}
`;

const FeedbackButtonSize = InlineL;
const FeedbackIconSize = (FeedbackButtonSize * 4) / 7;

const FeedbackButtonContainer = styled(ButtonContainer)`
  ${Center};
  border-radius: ${FeedbackButtonSize / 2}px;
  border: 1px solid ${MangoTango};
  height: ${FeedbackButtonSize}px;
  width: ${FeedbackButtonSize}px;
`;

export default HomeScreen;
