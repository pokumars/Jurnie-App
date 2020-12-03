// import libraries
import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Pressable, Text } from 'react-native';
import color from '../../constants/color';
import globalStyles from '../../constants/globalStyle';

const BooleanUnsureResponse = (props) => {
  useEffect(() => {
    props.setMediaOrDone(null);
  });
  // selectedBtn is to determine which button is selected so we can highlight it.
  const [selectedBtnText, setSelectedBtnText] = useState(null);
  const highlightSelection = (btnText) => {
    if (btnText === selectedBtn) {
      return {};
    }
  };

  return (
    <View style={globalStyles.responderViewContainer}>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[
            styles.buttonView,
            { backgroundColor: selectedBtnText === 'yes' ? color.STEEL_BLUE : 'white' },
          ]}
          onPress={() => {
            props.setAnswered(true); // shows btn that says next
            props.setAnswer('yes'); // set answer in Questionnaire
            setSelectedBtnText('yes') // so we know which button to highlight as selected
            console.log('yes clicked');
          }}>
          <Text style={[styles.btnText, { color: selectedBtnText === 'yes' ? 'white' : 'black' }]}>
            Yes
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.buttonView,
            { backgroundColor: selectedBtnText === 'no' ? color.STEEL_BLUE : 'white' },
          ]}          onPress={() => {
            props.setAnswered(true); // shows btn that says next
            props.setAnswer('no'); // set answer in Questionnaire
            setSelectedBtnText('no') // so we know which button to highlight as selected
            console.log('no clicked');
          }}>
          <Text style={[styles.btnText, { color: selectedBtnText === 'no' ? 'white' : 'black' }]}>
            No
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.buttonView,
            // if this btn is selected, give the button background
            { backgroundColor: selectedBtnText === 'not sure' ? color.STEEL_BLUE : 'white' },
          ]}
          onPress={() => {
            props.setAnswered(true); // shows btn that says next
            props.setAnswer('not sure'); // set answer in Questionnaire
            setSelectedBtnText('not sure'); // so we know which button to highlight as selected
            console.log('not sure clicked');
          }}>
          <Text style={[styles.btnText, { color: selectedBtnText === 'not sure' ? 'white' : 'black' }]}>
            Not Sure
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const btnHeight = 35;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    padding: 5,
  },
  buttonView: {
    width: '30%',
    height: btnHeight,
    borderWidth: 2,
    borderColor: color.STEEL_BLUE,
    borderRadius: btnHeight / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'black',
  },
});

export default BooleanUnsureResponse;
