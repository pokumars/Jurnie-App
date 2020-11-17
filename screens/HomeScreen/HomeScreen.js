import React from 'react';
import styled from 'styled-components';

import Avatar from 'components/Avatar';
import { ButtonContainer, ButtonWrapper } from 'components/Button';
import { DefaultCard } from 'components/Cards';
import {
  Emperor,
  Fire,
  Grenadier,
  HawaiianTan,
  MangoTango,
  MineShaft,
  Rajah,
  RoyalBlue,
} from 'components/Colors';
import Icon from 'components/Icon';
import {
  BigText,
  BoldText,
  SubtitleText,
  TextXS,
  TextXXL,
  TextXXS,
  TextXXXXS,
} from 'components/Text';
import {
  Center,
  DefaultContainer,
  InlineS,
  InlineM,
  InlineL,
  InlineXL,
  Row,
  StackS,
  StackM,
} from 'components/Spacing';
import TransportTile from 'components/TransportTile';

import { MEANS_OF_TRANSPORT } from 'app-constants';

const HomeScreen = ({ navigation }) => {
  const defaultValues = {
    meansOfTransport: MEANS_OF_TRANSPORT.BUS,
  };

  const onWriteFeedbackButtonPress = () => {};

  return (
    <ScreenContainer>
      <LastTrip {...{ onWriteFeedbackButtonPress }} />
      <YourPosition />
    </ScreenContainer>
  );
};

const ScreenContainer = styled.View`
  ${DefaultContainer};
  padding-top: ${StackM}px;
`;

const LastTrip = ({ onWriteFeedbackButtonPress }) => (
  <LastTripContainer>
    <SubtitleText>LAST TRIP</SubtitleText>
    <LastTripCard>
      <MeansOfTransportText>On Bus</MeansOfTransportText>
      <TransportTile
        source={require('assets/icons/bus-white.png')}
        backgroundColor={HawaiianTan}
      />
      <FeedbackButton onPress={onWriteFeedbackButtonPress} />
    </LastTripCard>
  </LastTripContainer>
);

const LastTripContainer = styled.View`
  margin-bottom: ${InlineL}px;
`;

const LastTripCard = styled(DefaultCard)`
  ${Row}
  align-items: center;
  background-color: ${Rajah};
  justify-content: space-between;
`;

const MeansOfTransportText = styled(BoldText)`
  color: ${MineShaft};
  font-size: ${TextXXS}px;
`;

const FeedbackButton = ({ onPress }) => (
  <FeedbackButtonWrapper {...{ onPress }}>
    <FeedbackButtonContainer>
      <Icon
        size={{ width: FeedbackIconSize, height: FeedbackIconSize }}
        source={require('assets/icons/feedback.png')}
        tintColor={RoyalBlue}
      />
    </FeedbackButtonContainer>
    <FeedbackButtonText>Write feedback</FeedbackButtonText>
  </FeedbackButtonWrapper>
);

const FeedbackButtonText = styled.Text`
  color: ${MineShaft};
  font-size: ${TextXXXXS}px;
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

const YourPosition = ({}) => (
  <>
    <SubtitleText>YOUR POSITION</SubtitleText>
    <YourPositionCard>
      <UserInfo>
        <Avatar
          size={InlineXL}
          source={{
            uri:
              'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
          }}
        />
        <UserNameText>Test</UserNameText>
      </UserInfo>
      <CompetitionInfo>
        <RankingInfo>
          <NumberText color={Grenadier}>23</NumberText>
          <AnnotationText>FINNISH RANKING</AnnotationText>
        </RankingInfo>
        <ScoreInfo>
          <NumberText color={Fire}>21</NumberText>
          <AnnotationText>POINTS</AnnotationText>
        </ScoreInfo>
        <PointToTopTenInfo>
          <NumberText color={Fire}>10</NumberText>
          <AnnotationText>POINTS MORE TO TOP 10</AnnotationText>
        </PointToTopTenInfo>
      </CompetitionInfo>
    </YourPositionCard>
  </>
);

const YourPositionCard = styled(DefaultCard)``;

const UserInfo = styled.View`
  ${Row};
  align-items: center;
  margin-bottom: ${StackM}px;
`;

const UserNameText = styled(BigText)`
  margin-left: ${InlineM}px;
`;

const CompetitionInfo = styled.View``;

const CompetitionInfoRow = styled.View`
  ${Row};
  align-items: center;
`;

const NotTheLastCompetitionInfoRow = styled(CompetitionInfoRow)`
  margin-bottom: ${StackS}px;
`;

const RankingInfo = styled(NotTheLastCompetitionInfoRow)``;
const ScoreInfo = styled(NotTheLastCompetitionInfoRow)``;
const PointToTopTenInfo = styled(CompetitionInfoRow)``;

const NumberText = styled.Text`
  color: ${(props) => props.color || MineShaft};
  font-size: ${TextXXL}px;
  font-weight: 700;
  line-height: ${TextXXL}px;
  margin-right: ${InlineS}px;
`;

const AnnotationText = styled.Text`
  color: ${Emperor};
  font-size: ${TextXS}px;
`;

export default HomeScreen;
