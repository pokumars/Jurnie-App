// import libraries
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import color from '../../constants/color';
import globalStyles from '../../constants/globalStyle';

const EmojiRatingResponse = (props) => {
  useEffect(() => {
    props.setMediaOrDone(null);
  }); 
  return (
    <View style={globalStyles.responderViewContainer}>
      <View style={styles.emojisContainer}>
        <View style={styles.emojiView}>
          <Pressable
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('4_happy');
              console.log('happiest clicked');
            }}>
            <Image
              style={styles.emojiImage}
              source={require('../../assets/icons/surveyEmojis/happy_survey_4.png')}
            />
          </Pressable>
        </View>
        <View style={styles.emojiView}>
          <Pressable
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('3_smile');
              console.log('3_smile clicked');
            }}>
            <Image
              style={styles.emojiImage}
              source={require('../../assets/icons/surveyEmojis/smile_survey_3.png')}
            />
          </Pressable>
        </View>
        <View style={styles.emojiView}>
          <Pressable
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('2_sad');
              console.log('2_sad clicked');
            }}>
            <Image
              style={styles.emojiImage}
              source={require('../../assets/icons/surveyEmojis/sad_survey_2.png')}
            />
          </Pressable>
        </View>
        <View style={styles.emojiView}>
          <Pressable
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('1_angry');
              console.log('1_angry clicked');
            }}>
            <Image
              style={styles.emojiImage}
              source={require('../../assets/icons/surveyEmojis/angry_survey_1.png')}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const emojiDimension = 60;
// define your styles
const styles = StyleSheet.create({
  emojisContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: color.BLACK,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 15,
    paddingVertical: 20,
  },
  emojiView: {
    width: emojiDimension,
    height: emojiDimension,
    // width: emojiDimension,
    borderRadius: emojiDimension / 2,
    borderWidth: 1,
    borderColor: color.WHITE,
    overflow: 'hidden',
    marginVertical: 5,
  },
  emojiImage: {
    height: '100%',
    width: '100%',
  },
});

export default EmojiRatingResponse;
