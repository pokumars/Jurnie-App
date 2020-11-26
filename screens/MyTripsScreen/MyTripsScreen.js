import React, { useState } from 'react';
import { FlatList } from 'react-native';

import styled from 'styled-components';

import { MEANS_OF_TRANSPORT } from 'app-constants';
import { DefaultContainer, StackM } from 'components/Spacing';
import { SubtitleText } from 'components/Text';
import TripCard from './components/TripCard';
import WeekCalendar from './components/WeekCalendar';

const testTrips = [
  {
    destination: 'Kamppi',
    origin: 'Pihläjämäki',
    meansOfTransport: [
      { time: 300, type: MEANS_OF_TRANSPORT.BUS },
      { time: 200, type: MEANS_OF_TRANSPORT.TRAIN },
      { time: 200, type: MEANS_OF_TRANSPORT.WALK },
      { time: 500, type: MEANS_OF_TRANSPORT.CAR },
    ],
  },
  {
    destination: 'Kamppi',
    origin: 'Pihläjämäki',
    meansOfTransport: [
      { time: 300, type: MEANS_OF_TRANSPORT.BUS },
      { time: 200, type: MEANS_OF_TRANSPORT.TRAIN },
      { time: 200, type: MEANS_OF_TRANSPORT.WALK },
      { time: 500, type: MEANS_OF_TRANSPORT.CAR },
    ],
  },
];

const MyTripsScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <ScreenContainer>
      <WeekCalendar currentDate={new Date()} {...{ selectedDate, setSelectedDate }} />
      <MyTrips />
    </ScreenContainer>
  );
};

const MyTrips = () => (
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
);

const ScreenContainer = styled.View`
  ${DefaultContainer};
  flex: 1;
  padding-top: ${StackM}px;
`;

export default MyTripsScreen;
