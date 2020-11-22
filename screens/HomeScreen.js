import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components';

import Avatar from 'components/Avatar';
import { ButtonContainer, ButtonWrapper } from 'components/Button';
import { DefaultCard } from 'components/Cards';
import { FlatList, DeviceEventEmitter } from 'react-native';
import auth from '@react-native-firebase/auth';
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
import TmdApi from '../bridge/TmdApi';
import color from '../constants/color';

import { MEANS_OF_TRANSPORT } from 'app-constants';
import firestore from '@react-native-firebase/firestore';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

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
  const [tmdIsRunning, setTmd] = useState(false);
  const [activity, setActivity] = useState('nothing');
  const [arraydata, setarraydata] = useState([]);
  const [currentTrip, setcurrentTrip] = useState();
  const [array, setarray] = useState([]);
  const tar = [];

  const defaultValues = {
    meansOfTransport: MEANS_OF_TRANSPORT.BUS,
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('TmdStatus', (event) => {
      console.log('tmd status:', event.isTmdRunning);
    });
  }, []);

  useEffect(() => {
    try {
      TmdApi.fetchTmdData(
        (activities, str) => {
          console.log('Tmd success');
          getthat(activities);

          setActivity(str);
          //console.log('AAAAAAAAAAa', arraydata);
        },
        (err) => {
          console.log('Tmd error', err);
        },
      );
    } catch (e) {
      console.log('error', e.message);
    }
  }, []);
  useEffect(() => {
    try {
      DeviceEventEmitter.addListener('DownloadResult', (event) => {
        console.log(
          'TmdData:',
          event.HasResultError,
          event.HasResultMessage,
          event.TmdActivity,
          event.resultStr,
        );
        setActivity(event.resultStr);
      });
    } catch (e) {
      console.log('error', e.message);
    }
  });

  const toggleTmdService = () => () => {
    if (!tmdIsRunning) {
      TmdApi.startTmdService();
      setTmd(true);
    } else {
      TmdApi.stopTmdService();
      setTmd(false);
    }
  };

  const getthat = (arr) => {
    /*TmdApi.fetchTmdData(
      (activities, str) => {
        console.log('Tmd success', activities);
        setarray(activities);
        // getthat();
        setActivity(str);
        //console.log('AAAAAAAAAAa', arraydata);
      },
      (err) => {
        console.log('Tmd error', err);
      },
    );

    console.log('array:', array.length, '   arraydata: ', arraydata.length);
*/
    console.log('oooop');
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .get()
      .then((querySnapshot) => {
        console.log('Total trips: ', querySnapshot.size);
        var chunks = [],
          // i = 0,
          n = querySnapshot.size;
        /*while (i < n) { chunks.push(querySnapshot.docs[i].id); }*/
        //const data = querySnapshot.docs.map((id) => id)
        /*for (i in (0, n, i++)) { }*/

        if (arr.length == 0 || arr == null) {
          console.log('no data found');
        } else {
          for (let i = 0; i < n; i++) {
            const data = querySnapshot.docs[i].id;
            chunks.push(data);
          }
          console.log(chunks); //console.log(chunks.includes('dd'));
          for (var i = 0; i < arr.length; i++) {
            if (chunks.includes(arr[i].id)) {
              console.log(arr[i].id, 'already');
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

  const renderItem = ({ item }) => {
    <Item title={item.timeEnd} onPress={() => setSelectedId(item.id)} />;
  };

  const GetCurrent = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .orderBy('dateAdded', 'desc')
      .limit(1)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        //console.log(data);

        setcurrentTrip(data);
        //console.log('kkkkk', data);
      });
  };

  const Sth = () => {
    return (
      <View>
        <Text>YRsssssssssssss</Text>
      </View>
    );
  };

  //console.log(arraydata[i].activityType); } } }); };

  const onWriteFeedbackButtonPress = () => {};

  return (
    <View>
      <Text>HomeScreen</Text>

      <Button
        onPress={toggleTmdService()}
        title={tmdIsRunning ? 'Stop TMD' : 'Start TMD'}
        color={tmdIsRunning ? color.STEEL_BLUE : color.ORANGE_CAR}
        accessibilityLabel="start or stop TMD service"
      />
      <Button
        onPress={() =>
          TmdApi.fetchTmdData(
            (activities, str) => {
              console.log('Tmd success', activities);
              setActivity(str);
              getthat(activities);
            },
            (err) => {
              console.log('Tmd error', err);
            },
          )
        }
        title="fetch"
        color={color.STEEL_BLUE}
        accessibilityLabel="fetch data"
      />

      <Button title="get LastTrip" onPress={() => GetCurrent()} />
      <FlatList
        data={currentTrip}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

/*<ScreenContainer>
      <LastTrip {...{ onWriteFeedbackButtonPress }} />
      <YourPosition />
    </ScreenContainer>*/

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
