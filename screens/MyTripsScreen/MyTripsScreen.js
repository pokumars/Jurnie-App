import React, { useState } from 'react';
import { Text, View, FlatList, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styled from 'styled-components';
import moment from 'moment';

import { MEANS_OF_TRANSPORT } from 'app-constants';
import { DefaultContainer, StackM } from 'components/Spacing';
import { SubtitleText } from 'components/Text';
import TripCard from './components/TripCard';
import WeekCalendar from './components/WeekCalendar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Item = ({ title, start, mode, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text>{start}</Text>
    <Text>{mode}</Text>
    <Text style={{ fontSize: 17, marginRight: 0 }}>{title}</Text>
  </TouchableOpacity>
);

const MyTripsScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentTrip, setcurrentTrip] = useState([]);
  const [selectedId, setselectedId] = useState(null);

  const renderItem = ({ item }) => (
    <Item
      title={item.timeEnd}
      start={item.timestart}
      mode={item.activityType}
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
