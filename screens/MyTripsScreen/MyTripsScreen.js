import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .where('datefortrips', '==', moment(selectedDate).format('DD/MM/YYYY'))
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setcurrentTrip(data);
      });
  }, [selectedDate]);

  const renderItem = ({ item }) => (
    <TripCard
      endingTime={item.timeEnd}
      feed={item.feedGiven}
      transportMode={item.activityType}
      startingTime={item.timestart}
      title={item.timeEnd}
      onFeedbackButtonPress={() => onFeedbackButtonPress(item.id, item)}
      onTripCardPress={() => onTripCardPress(item.id)}
    />
  );

  const onFeedbackButtonPress = (id, item) => {
    navigation.navigate('Questionnaire', {
      paramKey: id,
      paramtrip: item,
    });
  };

  const onTripCardPress = (id) => {
    navigation.navigate('Detailed', {
      paramKey: id,
    });
  };

  return (
    <ScreenContainer>
      <WeekCalendar
        currentDate={new Date()}
        {...{ selectedDate, setSelectedDate }}
      />
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

const ScreenContainer = styled.View`
  ${DefaultContainer};
  flex: 1;
  padding-top: ${StackM}px;
`;

export default MyTripsScreen;
