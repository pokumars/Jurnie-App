import { StyleSheet } from 'react-native';
import color from './color';

const DEFAULT_HORIZONTAL_PADDING = 16;
const PROFILE_PIC_DIMENSION = 150;

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

  profilePicContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicView: {
    height: PROFILE_PIC_DIMENSION,
    width: PROFILE_PIC_DIMENSION,
    borderRadius: PROFILE_PIC_DIMENSION / 2,
    borderWidth: 1,
    borderColor: color.STEEL_BLUE,
    overflow: 'hidden',
    marginVertical: 5,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  buttonsSideBySideContainer: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-around',
  },
  sideBySideButtonView: {
    width: '40%',
  },
  responderViewContainer: {
    marginVertical: 20,
  },
});

export default globalStyles;
