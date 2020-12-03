// import libraries
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import color from '../../constants/color';
import globalStyles from '../../constants/globalStyle';

const EmojiRatingResponse = (props) => {
  const [selectedEmojiText, setSelectedEmojiText] = useState(null);
  useEffect(() => {
    props.setMediaOrDone(null);
  });
  return (
    <View style={globalStyles.responderViewContainer}>
      <View style={styles.emojisContainer}>
        <View style={[
            styles.emojiView,
            selectedEmojiText === '4_happy' ? styles.highlightedEmoji : null,
          ]}>
          <Pressable
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('4_happy');
              setSelectedEmojiText('4_happy'); // so we know which button to highlight as selected
              console.log('happiest clicked');
            }}>
            <Image
              style={styles.emojiImage}
              source={require('../../assets/icons/surveyEmojis/happy_survey_4.png')}
            />
          </Pressable>
        </View>
        <View style={[
            styles.emojiView,
            selectedEmojiText === '3_smile' ? styles.highlightedEmoji : null,
          ]}>
          <Pressable
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('3_smile');
              setSelectedEmojiText('3_smile'); // so we know which button to highlight as selected
              console.log('3_smile clicked');
            }}>
            <Image
              style={styles.emojiImage}
              source={require('../../assets/icons/surveyEmojis/smile_survey_3.png')}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.emojiView,
            selectedEmojiText === '2_sad' ? styles.highlightedEmoji : null,
          ]}>
          <Pressable
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('2_sad');
              setSelectedEmojiText('2_sad'); // so we know which button to highlight as selected
              console.log('2_sad clicked');
            }}>
            <Image
              style={styles.emojiImage}
              source={require('../../assets/icons/surveyEmojis/sad_survey_2.png')}
            />
          </Pressable>
        </View>
        <View style={[
            styles.emojiView,
            selectedEmojiText === '1_angry' ? styles.highlightedEmoji : null,
          ]}>
          <Pressable
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('1_angry');
              setSelectedEmojiText('1_angry'); // so we know which button to highlight as selected
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
  highlightedEmoji: {
    borderWidth: 2,
    borderColor: color.JUMBO,
    borderRadius: emojiDimension / 5,
    padding: 2,
    //backgroundColor: color.JUMBO,
  }
});

export default EmojiRatingResponse;
