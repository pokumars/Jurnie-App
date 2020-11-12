import { StyleSheet } from 'react-native';

import COLOR from './color';

const DEFAULT_HORIZONTAL_PADDING = 16;
const ANDROID_STYLES = {
  SUBTITLE: {
    FONT_SIZE: 14,
    OPACITY: 0.5438,
  },
};

const globalStyles = StyleSheet.create({
  ANDROID_SUBTITLE: {
    color: COLOR.BLACK,
    fontSize: ANDROID_STYLES.SUBTITLE.FONT_SIZE,
    opacity: ANDROID_STYLES.SUBTITLE.OPACITY,
  },
  CENTER: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  DEFAULT_CONTAINER: {
    paddingHorizontal: DEFAULT_HORIZONTAL_PADDING,
  },
  ROW: {
    flexDirection: 'row',
  },
});

export default globalStyles;
