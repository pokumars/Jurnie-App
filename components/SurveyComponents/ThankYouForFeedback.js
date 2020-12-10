import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../constants/globalStyle';

const ThankYouForFeedback = (props) => {
  useEffect(() => {
    props.setMediaOrDone('done');
    props.setAnswered(true);
  });

  return (
    <View style={globalStyles.responderViewContainer}>
      
      <Text>Press done to save</Text>
      <Text> +{props.points} points</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

// make this component available to the app
export default ThankYouForFeedback;
