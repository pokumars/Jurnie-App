import { StyleSheet } from 'react-native';

const DEFAULT_HORIZONTAL_PADDING = 16;

const globalStyles = StyleSheet.create({
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
