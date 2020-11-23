import React from 'react';
import { Button, Text, View } from 'react-native';

const MyTripsScreen = ({ navigation }) => (
  <View>
    <Button title="Go to Questionnaire" onPress={() => navigation.navigate('Questionnaire')} />
    <Text>MyTripsScreen</Text>
  </View>
);

export default MyTripsScreen;
