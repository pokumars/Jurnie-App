import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DefaultCard } from '../components/Cards/Cards';
import { BoldText, TextXS } from '../components/Text/Text';
import color from '../constants/color';
import globalStyle from '../constants/globalStyle';
import { Picker } from '@react-native-picker/picker';
import { transportModes } from '../helpers/TmdTransportModes';
const exampleTripObject = {
  activityType: 'motorized/road/car',
  co2: 0,
  dateAdded: 'November 22, 2020 at 7:20:19 PM UTC+2',
  destination: '',
  distance: 2.1,
  duration: '28m47s',
  feed1: '',
  feed2: '',
  feed3: '',
  feed4: '',
  feedGiven: false,
  id: '2',
  img1: '',
  img2: '',
  img3: '',
  img4: '',
  origin: '',
  polyline: '{gnnJmgkwCC@',
  speed: 0.0000012154339272753793,
  timeEnd: '16:16',
  timestart: '15:47',
};
const capitaliseModeofTransport = (mode) => {
  return mode
    .split('/')
    .pop()
    .replace(/^\w/, (m) => m.toUpperCase());
};
const Questionnaire = ({ navigation }) => {
  /* if feedGiven is false, then isCorrectTransportMode should be null. Because
  user cant proceed to give feedback until they have answered isCorrectTransportMode.
  This condition is so that if user clicks yes/no but then  aborts feedback altogether,
  the next time they come back, isCorrectTransportMode will be null so that they get the
  chance to choose the correct one */ // TODO: the above
  const [isCorrectTransportMode, setIsCorrectTransportMode] = useState(null);
  const [selectedMode, setSelectedMode] = useState(exampleTripObject.activityType);
  console.log(
    `isCorrectTransportMode -------------${isCorrectTransportMode}
    selectedMode------------------${selectedMode}`
  );

  // activityTypeString is required. pass it as props or as part of the passed in trip object
  const activityTypeString = capitaliseModeofTransport(selectedMode);

  return (
    <View>
      <DefaultCard style={styles.card}>
        <Text style={[{ fontSize: TextXS }]}>
          Your mode of transport was <BoldText>{activityTypeString}</BoldText>.
        </Text>
        <Text style={[{ fontSize: TextXS }]}>Is this correct?</Text>
        <View style={globalStyle.buttonsSideBySideContainer}>
          <View style={globalStyle.sideBySideButtonView}>
            <Button title="yes" onPress={() => setIsCorrectTransportMode(true)} />
          </View>
          <View style={globalStyle.sideBySideButtonView}>
            <Button
              title="no"
              color={color.ERR_RED}
              onPress={() => setIsCorrectTransportMode(false)}
            />
          </View>
        </View>
      </DefaultCard>
      {isCorrectTransportMode === false && (
        <>
          <Text> Choose the correct one and press YES</Text>
          <Picker
            selectedValue={selectedMode}
            onValueChange={(itemValue, itemIndex) => setSelectedMode(itemValue)}>
            {transportModes.map((mode) => {
              return (
                <Picker.Item key={mode} label={capitaliseModeofTransport(mode)} value={mode} />
              );
            })}
          </Picker>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Questionnaire;
