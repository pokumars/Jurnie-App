import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import TransportTile from 'components/TransportTile';

import { COLOR, GLOBAL_STYLE, MEANS_OF_TRANSPORT, SIZE } from 'app-constants';

const HomeScreen = ({ navigation }) => {
  const defaultValues = {
    meansOfTransport: MEANS_OF_TRANSPORT.BUS,
  };

  const renderLastTrip = () => (
    <>
      <Text
        style={[
          Platform.OS === 'android' ? GLOBAL_STYLE.ANDROID_SUBTITLE : null,
          styles.subtitle,
        ]}>
        LAST TRIP
      </Text>
      <View style={[styles.cardContainer, GLOBAL_STYLE.ROW]}>
        <Text style={styles.meansOfTransportText}>On Bus</Text>
        <TransportTile
          source={require('../assets/icons/bus-white.png')}
          backgroundColor={COLOR.HAWAIIAN_TAN}
          size={SIZE.TRANSPORT_TILE.DEFAULT_SIZE}
        />
        {renderWriteFeedbackButton()}
      </View>
    </>
  );

  const renderWriteFeedbackButton = () => (
    <TouchableOpacity
      onPress={onWriteFeedbackButtonPress}
      style={GLOBAL_STYLE.CENTER}>
      <View style={[styles.feedbackButton, GLOBAL_STYLE.CENTER]}>
        <FastImage
          source={require('../assets/icons/feedback-royal-blue.png')}
          style={styles.feedbackIcon}
        />
      </View>
      <Text style={styles.feedbackButtonLabel}>Write feedback</Text>
    </TouchableOpacity>
  );

  const onWriteFeedbackButtonPress = () => {};

  return (
    <View style={[styles.container, GLOBAL_STYLE.DEFAULT_CONTAINER]}>
      {renderLastTrip()}
    </View>
  );
};

const LAYOUT = {
  CONTAINER: {
    TOP_PADDING: 40,
  },
  FEEDBACK_BUTTON: {
    BORDER_WIDTH: 1,
    FEEDBACK_ICON: {
      SIZE: 20,
    },
    LABEL_FONT_SIZE: 9,
    SIZE: 35,
  },
  LAST_TRIP_CARD: {
    BORDER_RADIUS: 12,
    HORIZONTAL_PADDING: 16,
    MEANS_OF_TRANSPORT_TEXT_FONT_SIZE: 16,
    VERTICAL_PADDING: 20,
  },
  SUBTITLE: {
    MARGIN_BOTTOM: 16,
  },
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    backgroundColor: COLOR.RAJAH,
    borderRadius: LAYOUT.LAST_TRIP_CARD.BORDER_RADIUS,
    justifyContent: 'space-between',
    paddingHorizontal: LAYOUT.LAST_TRIP_CARD.HORIZONTAL_PADDING,
    paddingVertical: LAYOUT.LAST_TRIP_CARD.VERTICAL_PADDING,
  },
  container: {
    paddingTop: LAYOUT.CONTAINER.TOP_PADDING,
  },
  feedbackButton: {
    borderRadius: LAYOUT.FEEDBACK_BUTTON.SIZE / 2,
    borderColor: COLOR.MANGO_TANGO,
    borderWidth: LAYOUT.FEEDBACK_BUTTON.BORDER_WIDTH,
    height: LAYOUT.FEEDBACK_BUTTON.SIZE,
    width: LAYOUT.FEEDBACK_BUTTON.SIZE,
  },
  feedbackButtonLabel: {
    color: COLOR.MINE_SHAFT,
    fontSize: LAYOUT.FEEDBACK_BUTTON.LABEL_FONT_SIZE,
  },
  feedbackIcon: {
    height: LAYOUT.FEEDBACK_BUTTON.FEEDBACK_ICON.SIZE,
    width: LAYOUT.FEEDBACK_BUTTON.FEEDBACK_ICON.SIZE,
  },
  meansOfTransportText: {
    color: COLOR.MINE_SHAFT,
    fontSize: LAYOUT.LAST_TRIP_CARD.MEANS_OF_TRANSPORT_TEXT_FONT_SIZE,
    fontWeight: '700',
  },
  subtitle: {
    marginBottom: LAYOUT.SUBTITLE.MARGIN_BOTTOM,
  },
});

export default HomeScreen;
