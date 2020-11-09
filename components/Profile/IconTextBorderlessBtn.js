//import libraries
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

/**
 * @param {Boolean} textFirst - True means Text on the left, icon on right. False is opposite.
 * @param {string} btnImage - the image source of a react native <Image />
 * @param {string} btnText - text that goes with the icon
 * @param {function} onPress - function when pressed
 */
const IconTextBorderlessBtn = ({textFirst, btnImage, btnText, onPress, }) => {
return (
  <TouchableOpacity
   style={[ styles.container, {flexDirection: textFirst? 'row': 'row-reverse' }]}
    onPress={() => onPress()} >
   <Text style={styles.actionText} > {btnText}</Text>
    <Image source={btnImage} style={styles.actionIcons} />    
  </TouchableOpacity>
  )
};

// define your styles
const styles = StyleSheet.create({
  actionIcons: {
    height: 25,
    width: 25
  },
  actionText: {
    fontSize: 15,
    color: '#4A86AC',
    paddingHorizontal: 5
  },
  container:{
    flexDirection:'row',
  },
  logoutContainer:{
    
  },
});

//make this component available to the app
export default IconTextBorderlessBtn;
