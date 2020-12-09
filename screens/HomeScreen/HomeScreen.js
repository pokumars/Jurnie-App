/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import actions from 'redux-core/actions';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import styled from 'styled-components';

import Avatar from 'components/Avatar';
import { ButtonContainer, ButtonWrapper } from 'components/Button';
import { DefaultCard } from 'components/Cards';

import {
  Emperor,
  Fire,
  Grenadier,
  MangoTango,
  MineShaft,
  Rajah,
  RoyalBlue,
  SteelBlue,
  White,
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

import { extractModeofTransport } from 'helpers/TmdTransportModes';
import TmdApi from 'bridge/TmdApi';
import { getIconByMode } from 'helpers/tmdHelpers';
import { nonEssentialModes } from '../../constants/transport';

const HomeScreen = ({ navigation, profilePictureUrl }) => {
  const [tmdSize, setTmdSize] = useState();

  const [currentTrip, setcurrentTrip] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [firstUser, setFirstUser] = useState();
  const [indexUser, setindexUser] = useState();
  const [array, setarray] = useState([]);

  // checks if TMD service is running
  useEffect(() => {
    const isTmdRunning = async () => {
      try {
        const isRunning = await TmdApi.isTmdRunning();
        setTmdStatus(isRunning);
        console.log('tmdstatus', tmdStatus);
      } catch (e) {
        console.log('tmdIsRunning error', e.message);
      }
    };
    isTmdRunning();
  }, []);

  const [tmdStatus, setTmdStatus] = useState();

  useEffect(() => {
    // fetch mobility data from TMD SDK
    const getTmdData = async () => {
      try {
        const tmd = await TmdApi.fetchTmdData();
        setTmdSize(tmd.length);
        console.log('Tmd success', tmd);
        if (Array.isArray(tmd)) {
          getthat(tmd);
        }
      } catch (e) {
        console.error('error', e.message);
      }
    };
    getTmdData();
  });
  
   const fetchProfilePicAtFirstLogin = () => {
    /* the first time a user installs and lofs in, the profile pic doesnt load
    This is a fallback for that scenario */
    if (profilePictureUrl === null || profilePictureUrl === '') {
      const fetchedUrl = auth().currentUser ? auth().currentUser.photoURL || '' : ''
      setProfilePictureUrl(fetchedUrl);
    }
  };
  useEffect(fetchProfilePicAtFirstLogin, []);
  
  useEffect(
    function Fetchcu() {
      firestore()
        .collection('users')
        .orderBy('totalFeeds', 'desc')
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setarray(data);
          console.log('data', array);

          setindexUser(data.findIndex((obj) => obj.email === auth().currentUser.email));

          const val =
            data[data.findIndex((obj) => obj.email === auth().currentUser.email)].totalFeeds;

          setFirstUser(data[0].totalFeeds - val);
          setcurrentUser(val);
          // setFirstUser(data[0].totalFeeds);

          console.log('points ranking', indexUser, val, firstUser);
        });
    },
    []
  );

  useEffect( () => {
    firestore()
        .collection('users')
        .doc(auth().currentUser.email)
        .collection('trips')
        .orderBy('dateAdded', 'desc')
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs
            .map((doc) => doc.data())
            .filter((transportMode) => !nonEssentialModes.includes(transportMode.activityType));
          console.log(data);

          setcurrentTrip(data);
          // console.log('kkkkk', currentTrip);
    }   );
  },[tmdSize]);

  // starts/stops TMD
  const toggleTmdService = () => async () => {
    if (!tmdStatus) {
      setTmdStatus(true);
      TmdApi.startTmdService();
      console.log('tmdstatus', 1);
    } else {
      setTmdStatus(false);
      TmdApi.stopTmdService();
      console.log('tmdstatus', 0);
    }
  };

  const getthat = (arr) => {
    console.log('oooop');
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .get()
      .then((querySnapshot) => {
        console.log('Total trips: ', querySnapshot.size);
        const chunks = [];
        const n = querySnapshot.size;

        if (arr.length == 0 || arr == null) {
          console.log('no data found');
        } else {
          for (let i = 0; i < n; i++) {
            const data = querySnapshot.docs[i].id;
            chunks.push(data);
          }
          console.log(chunks); // console.log(chunks.includes('dd'));
          for (let i = 0; i < arr.length; i++) {
            if (chunks.includes(arr[i].id)) {
              console.log(arr[i].id, 'already or it is unwanted activity');
            } else {
              firestore()
                .collection('users')
                .doc(auth().currentUser.email)
                .collection('trips')
                .doc(arr[i].id)
                .set({
                  id: arr[i].id,
                  activityType: arr[i].activityType,
                  co2: arr[i].co2,
                  distance: arr[i].distance,
                  duration: arr[i].duration,
                  destination: arr[i].destination,
                  origin: arr[i].origin,
                  polyline: arr[i].polyline,
                  speed: arr[i].speed,
                  timestart: arr[i].timeStart,
                  timeEnd: arr[i].timeEnd,
                  dateAdded: firestore.FieldValue.serverTimestamp(),
                  datefortrips: moment(new Date()).format('DD/MM/YYYY'),
                  feed1: '',
                  feed2: '',
                  feed3: '',
                  feed4: '',
                  img1: '',
                  img2: '',
                  img3: '',
                  img4: '',
                  feedGiven: false,
                });
            }
          }
        }
      });
  };

  const onWriteFeedbackButtonPress = () => {
    navigation.navigate('Questionnaire', {
      paramKey: currentTrip[0].id,
      paramtrip: currentTrip[0],
    });
  };

  const ScreenContainer = styled.View`
    ${DefaultContainer};
    padding-top: ${StackM}px;
  `;

  const LastTrip = ({ onWriteFeedbackButtonPress }) => (
    <LastTripContainer>
      <SubtitleText>LAST TRIP</SubtitleText>
      <LastTripCard>
        {currentTrip.length !== 0 ? (
          <>
            <MeansOfTransportText>
              {extractModeofTransport(currentTrip[0].activityType)}
            </MeansOfTransportText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Detailed', {
                  paramKey: currentTrip[0].id,
                })
              }>
              <TransportTile
                source={getIconByMode(currentTrip[0].activityType)}
                backgroundColor={White}
              />
            </TouchableOpacity>
            <FeedbackButton onPress={onWriteFeedbackButtonPress} />
          </>
        ) : (
          <MeansOfTransportText>No Recent</MeansOfTransportText>
        )}
      </LastTripCard>
    </LastTripContainer>
  );

  const LastTripContainer = styled.View`
    margin: ${InlineL}px 0;
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

      {array.length !== 0 ? (
        <YourPositionCard>
          <UserInfo>
            <Avatar
              size={InlineXL}
              source={
                profilePictureUrl ? { uri: profilePictureUrl } : require('assets/icons/profile.png')
              }
            />
            <UserNameText>{auth().currentUser.displayName}</UserNameText>
          </UserInfo>
          <CompetitionInfo>
            <RankingInfo>
              <NumberText color={Grenadier}>{indexUser + 1}</NumberText>
              <AnnotationText>FINNISH RANKING</AnnotationText>
            </RankingInfo>
            <ScoreInfo>
              <NumberText color={Fire}>{currentUser}</NumberText>
              <AnnotationText>POINTS</AnnotationText>
            </ScoreInfo>
            <PointToTopTenInfo>
              <NumberText color={MangoTango}>{firstUser}</NumberText>
              <AnnotationText>POINTS MORE TO TOP 10</AnnotationText>
            </PointToTopTenInfo>
          </CompetitionInfo>
        </YourPositionCard>
      ) : (
        <Text>Fetching</Text>
      )}
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

  return (
    <ScreenContainer>
      <Button
        title={tmdStatus ? 'stop mobility detection' : 'start mobility detection'}
        onPress={toggleTmdService()}
        color={tmdStatus ? SteelBlue : MangoTango}
      />
      <LastTrip {...{ onWriteFeedbackButtonPress }} />
      <YourPosition />
    </ScreenContainer>
  );
};

/* export default connect((state) => ({
  profilePictureUrl: state.profilePictureReducer.profilePictureUrl,
}))(HomeScreen); */
export default connect(
  (state) => ({
    profilePictureUrl: state.profilePictureReducer.profilePictureUrl,
  }),
  { setProfilePictureUrl: actions.setProfilePictureUrl },
)(HomeScreen);