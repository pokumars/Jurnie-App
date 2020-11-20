import React from 'react';
import {StyleSheet, Text} from 'react-native';

const TitleText = (props) => {
  return (
    <Text style={{...styles.textStyle, ...props.style}}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontSize: 25,
  },
});
export default TitleText;
