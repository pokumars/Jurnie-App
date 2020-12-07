/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import styled from 'styled-components';

import Avatar from 'components/Avatar';
import { ButtonContainer, ButtonWrapper } from 'components/Button';
import { DefaultCard } from 'components/Cards';

import auth from '@react-native-firebase/auth';
import {
  Emperor,
  Fire,
  Grenadier,
  MangoTango,
  MineShaft,
  Rajah,
  RoyalBlue,
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
import moment from 'moment';

import { MEANS_OF_TRANSPORT } from 'app-constants';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import color from '../constants/color';
import TmdApi from '../bridge/TmdApi';
import { getIconByMode } from '../utils/helper';

const Item = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    }}>
    <Text style={{ fontSize: 28 }}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [activity, setActivity] = useState('nothing');
  const [arraydata, setarraydata] = useState([]);
  const [currentTrip, setcurrentTrip] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [indexUser, setindexUser] = useState();
  const [firstUser, setFirstUser] = useState();
  const [points, setpoints] = useState();
  const [array, setarray] = useState([]);
  const [update, setUpdate] = useState();
  const tar = [];

  const defaultValues = {
    meansOfTransport: MEANS_OF_TRANSPORT.BUS,
  };

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
    const getTmdData = async () => {
      try {
        const tmd = await TmdApi.fetchTmdData();
        console.log('Tmd success', tmd);
        if (Array.isArray(tmd)) {
          getthat(tmd);
        }
      } catch (e) {
        console.error('error', e.message);
      }
    };
    getTmdData();
  }, []);

  useEffect(function Fetchcu() {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .orderBy('dateAdded', 'desc')
      .limit(1)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data);

        setcurrentTrip(data);
        // console.log('kkkkk', currentTrip);
      });

    firestore()
      .collection('users')
      .orderBy('totalFeeds', 'desc')
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setarray(data);
        console.log('data', array);

        setindexUser(
          data.findIndex((obj) => obj.email === auth().currentUser.email),
        );

        const val =
          data[data.findIndex((obj) => obj.email === auth().currentUser.email)]
            .totalFeeds;

        setFirstUser(data[0].totalFeeds - val);
        setcurrentUser(val);
        // setFirstUser(data[0].totalFeeds);

        console.log('points ranking', indexUser, val, firstUser);
      });
  }, []);

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
        const activities = [
          'stationary',
          'non-motorized/pedestrian',
          'non-motorized/pedestrian/walk',
          'non-motorized/pedestrian/run',
          'unknown',
        ];
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
            if (
              chunks.includes(arr[i].id)
            ) {
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
      paramtrip: currentTrip,
    });
  };

  const ScreenContainer = styled.View`
    ${DefaultContainer};
    padding-top: ${StackM}px;
  `;

  const LastTrip = ({ onWriteFeedbackButtonPress }) => (
    <LastTripContainer>
      <Button
        title={tmdStatus ? 'stop TMD' : 'start TMD'}
        onPress={toggleTmdService()}
        color={tmdStatus ? color.STEEL_BLUE : color.MANGO_TANGO}
      />
      <SubtitleText>LAST TRIP</SubtitleText>
      <LastTripCard>
        {currentTrip.length !== 0 ? (
          <>
            <MeansOfTransportText>
              {currentTrip[0].activityType}
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

      {array.length !== 0 ? (
        <YourPositionCard>
          <UserInfo>
            <Avatar
              size={InlineXL}
              source={{
                uri:
                  'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
              }}
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
      <LastTrip {...{ onWriteFeedbackButtonPress }} />
      <YourPosition />
    </ScreenContainer>
  );
};

export default HomeScreen;
