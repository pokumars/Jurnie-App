import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import color from '../constants/color';
import TmdApi from '../bridge/TmdApi';
import {DeviceEventEmitter} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [tmdIsRunning, setTmd] = useState(false);
  const [activity, setActivity] = useState('nothing');

  useEffect(() => {
    DeviceEventEmitter.addListener('TmdStatus', (event) => {
      console.log('tmd status:', event.isTmdRunning);
    });
  }, []);

  useEffect(() => {
    try {
      DeviceEventEmitter.addListener('DownloadResult', (event) => {
        console.log(
          'TmdData:',
          event.HasResultError,
          event.HasResultMessage,
          event.TmdActivity,
          event.resultStr,
        );
        setActivity(event.resultStr);
      });
    } catch (e) {
      console.log('error', e.message);
    }
  });

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
      <Text>HomeScreen</Text>
      <Button
        onPress={toggleTmdService()}
        title={tmdIsRunning ? 'Stop TMD' : 'Start TMD'}
        color={tmdIsRunning ? color.STEEL_BLUE : color.ORANGE_CAR}
        accessibilityLabel="start or stop TMD service"
      />
      <Text>{activity}</Text>
    </View>
  );
};

export default HomeScreen;
