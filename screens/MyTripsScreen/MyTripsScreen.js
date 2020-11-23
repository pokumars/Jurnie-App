import React from 'react';
import { Text } from 'react-native';

import styled from 'styled-components';

import { MEANS_OF_TRANSPORT } from 'app-constants';
import { DefaultContainer } from 'components/Spacing';
import TripCard from './components/TripCard';

const testLocation = { destination: 'Kamppi', origin: 'Pihläjämäki' };
const testTransport = [
  { time: 300, type: MEANS_OF_TRANSPORT.BUS },
  { time: 200, type: MEANS_OF_TRANSPORT.TRAIN },
];

const MyTripsScreen = ({ navigation }) => (
  <ScreenContainer>
    <Text>MyTripsScreen</Text>
    <TripCard
      destination={testLocation.destination}
      meansOfTransport={testTransport}
      origin={testLocation.origin}
    />
  </ScreenContainer>
);

const ScreenContainer = styled.View`
  ${DefaultContainer};
`;

export default MyTripsScreen;
