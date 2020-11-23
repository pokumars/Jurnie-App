import React from 'react';
import { FlatList } from 'react-native';

import styled from 'styled-components';

import { MEANS_OF_TRANSPORT } from 'app-constants';
import { DefaultContainer, StackM } from 'components/Spacing';
import { SubtitleText } from 'components/Text';
import TripCard from './components/TripCard';

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

const MyTripsScreen = ({ navigation }) => (
  <ScreenContainer>
    <SubtitleText>MY TRIPS</SubtitleText>
    <FlatList
      data={testTrips}
      keyExtractor={(item, index) =>
        `Trip-${item.origin}-${item.destination}-${index}`
      }
      {...{ renderItem }}
    />
  </ScreenContainer>
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

  padding-top: ${StackM}px;
`;

export default MyTripsScreen;
