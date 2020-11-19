import { StyleSheet } from 'react-native';
import color from './color';


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
  profilePicContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicView: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: color.STEEL_BLUE,
    overflow: 'hidden',
    marginVertical: 5,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
});

export default globalStyles;
