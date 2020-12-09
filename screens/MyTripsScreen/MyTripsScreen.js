import React, { useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styled from 'styled-components';
import moment from 'moment';

import { DefaultContainer, StackM } from 'components/Spacing';
import TripCard from './components/TripCard';
import WeekCalendar from './components/WeekCalendar';
import { nonEssentialModes } from '../../constants/transport';

const MyTripsScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentTrip, setcurrentTrip] = useState([]);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .where('datefortrips', '==', moment(selectedDate).format('DD/MM/YYYY'))
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs
          .map((doc) => doc.data())
          .filter(
            (transportMode) =>
               ![nonEssentialModes[0], nonEssentialModes[5]].includes(transportMode.activityType)
          );
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
      <WeekCalendar currentDate={new Date()} {...{ selectedDate, setSelectedDate }} />
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
