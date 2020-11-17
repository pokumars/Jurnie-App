// for testing purposes only

import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import color from '../constants/color';
import TmdApi from '../bridge/TmdApi';
import {DeviceEventEmitter} from 'react-native';

const TestScreen = ({navigation}) => {
  const [tmdIsRunning, setTmd] = useState(false);

  useEffect(() => {
    DeviceEventEmitter.addListener('TmdStatus', (event) => {
      console.log('tmd status:', event.isTmdRunning);
    });
  }, []);

  useEffect(() => {
    DeviceEventEmitter.addListener('DownloadResult', (event) => {
      console.log(
        'TmdData:',
        event.NoResultError,
        event.HasResultError,
        event.HasResultMessage,
        event.TmdActivity,
      );
    });
  }, []);

  const toggleTmdService = () => () => {
    if (!tmdIsRunning) {
      TmdApi.startTmdService();
      setTmd(true);
    } else {
      TmdApi.stopTmdService();
      setTmd(false);
    }
  };

  return (
    <View>
      <Text>TestScreen</Text>
      <Button
        onPress={toggleTmdService()}
        title={tmdIsRunning ? 'Stop TMD' : 'Start TMD'}
        color={tmdIsRunning ? color.STEEL_BLUE : color.ORANGE_CAR}
        accessibilityLabel="start or stop TMD service"
      />
    </View>
  );
};

export default TestScreen;
