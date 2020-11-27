//import libraries
import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import color from '../../constants/color';
import globalStyles from '../../constants/globalStyle';


const BooleanUnsureResponse = (props) => {
  useEffect(() => {
    props.setMediaOrDone(null);
  });
  

  return (
    <View style={globalStyles.responderViewContainer}>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonView}>
          <Button
            title="yes"
            color={color.STEEL_BLUE}
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('yes');
              console.log('yes clicked');
            }}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            title="no"
            color={color.STEEL_BLUE}
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('no');
              console.log('no clicked');
            }}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            title="not sure"
            color={color.RAJAH}
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('not sure');
              console.log('not sure clicked');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
  },
  buttonView: {
    width: '30%',
  },
});

export default BooleanUnsureResponse;
