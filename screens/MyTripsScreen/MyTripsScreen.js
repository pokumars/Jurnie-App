import React, { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styled from 'styled-components';
import moment from 'moment';

import { MEANS_OF_TRANSPORT } from 'app-constants';
import { DefaultContainer, StackM } from 'components/Spacing';
import { SubtitleText } from 'components/Text';
import TripCard from './components/TripCard';
import WeekCalendar from './components/WeekCalendar';

const MyTripsScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentTrip, setcurrentTrip] = useState([]);
  const [selectedId, setselectedId] = useState(null);

  const Item = ({ title, start, mode, id, feed, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={{ fontWeight: 'bold' }}>{start}</Text>
      <Text>{GetMode(mode)}</Text>
      <Text style={{ fontWeight: 'bold' }}>{title}</Text>
      {feed == false ? (
        <TouchableOpacity
          style={{ backgroundColor: '#DDDDDD', padding: 10 }}
          onPress={() =>
            navigation.navigate('Questionnaire', {
              paramKey: id,
            })
          }>
          <Text>FeedBack</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ backgroundColor: '#DDDDDD', padding: 10 }}
          onPress={() =>
            navigation.navigate('Questionnaire', {
              paramKey: id,
            })
          }>
          <Text>Update Feed</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const GetMode = (activity) => {
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

  const renderItem = ({ item }) => (
    <Item
      title={item.timeEnd}
      start={item.timestart}
      mode={item.activityType}
      id={item.id}
      feed={item.feedGiven}
      onPress={() =>
        navigation.navigate('Detailed', {
          paramKey: item.id,
        })
      }
    />
  );

  const GetCurrent = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .where('datefortrips', '==', moment(selectedDate).format('DD/MM/YYYY'))
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        // console.log(data);

        setcurrentTrip(data);
        console.log('kkkkk', data);
      });
  };

  return (
    <ScreenContainer>
      <WeekCalendar
        currentDate={new Date()}
        {...{ selectedDate, setSelectedDate }}
      />
      <Button title="get" onPress={() => GetCurrent()} />
      {currentTrip.length !== 0 ? (
        <FlatList
          data={currentTrip}
          renderItem={renderItem}
          numColumns={1}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text> No data for today</Text>
      )}
    </ScreenContainer>
  );
};

/*const MyTrips = () => (
  <>
    <SubtitleText>MY TRIPS</SubtitleText>
    <FlatList
      data={testTrips}
      keyExtractor={(item, index) => `Trip-${item.origin}-${item.destination}-${index}`}
      {...{ renderItem }}
    />
  </>
);

const renderItem = ({ item }) => (
  <TripCard
    destination={item.destination}
    meansOfTransport={item.meansOfTransport}
    origin={item.origin}
  />
);*/

const ScreenContainer = styled.View`
  ${DefaultContainer};
  flex: 1;
  padding-top: ${StackM}px;
`;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default MyTripsScreen;
