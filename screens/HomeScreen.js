import React from 'react';
import { Image, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const HomeScreen = ({
    navigation,
}) => (
    <View>
        <Text>HomeScreen</Text>
        <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}  style={{ width: 24, height: 24 }}/>
    </View>
);

export default HomeScreen;
