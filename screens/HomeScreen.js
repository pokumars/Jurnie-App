import React, { useState } from 'react';
import {Image, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import { MEANS_OF_TRANSPORT } from '../constants';

const HomeScreen = ({navigation}) => {
  const defaultValues = {
    meansOfTransport: MEANS_OF_TRANSPORT.BUS,
  };
  const test = [12,3,4];

  const renderLastTrip = () => (
    <View>
      <Text>LAST TRIP</Text>
      <View>
        <Text>On Bus</Text>
        
      </View>
    </View>
  )
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
