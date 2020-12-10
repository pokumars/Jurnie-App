import React, { useEffect, useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { COLOR } from '../../constants';
import globalStyles from '../../constants/globalStyle';

const TextResponse = (props) => {
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    props.setMediaOrDone(null);
  });
  
  const skipText = () => {
    props.setAnswered(true);
    props.setAnswer('');
  };

  const submitText = () => {
    props.setAnswered(true);
    props.setAnswer(textValue);
  };
  return (
    <View style={[globalStyles.responderViewContainer, { alignItems: 'center' }]}>
      <TextInput
        multiline
        numberOfLines={6}
        style={{ borderColor: 'gray', borderWidth: 1, width: '100%' }}
        onChangeText={(text) => setTextValue(text)}
        value={textValue}
      />
      <View style={[globalStyles.sideBySideButtonView, { marginTop: 15 }]}>
        <Button title="submit" onPress={submitText} />
        <Button title="skip" onPress={skipText} color={COLOR.ERR_RED} />
      </View>
    </View>
  );
};

// make this component available to the app
export default TextResponse;
