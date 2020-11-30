import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View, StyleSheet } from 'react-native';
import MapViewOfTrip from './MapViewOfTrip';

const Item = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={{ fontSize: 28 }}>{title}</Text>
  </TouchableOpacity>
);

const DetailedScreen = ({ navigation, route }) => {
  const [speTrip, setspeTrip] = useState([]);
  const [selectedId, setselectedId] = useState(null);

  const renderItem = ({ item }) => (
    <Item title={item.timeEnd} onPress={() => setselectedId(item.id)} />
  );

  useEffect(function Fetchtrip() {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .doc(route.params.paramKey)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data();

        console.log(data);

        setspeTrip(data);
        // console.log('kkkkk', currentTrip);
      });
  }, []);

  return (
    <View >
      {speTrip.length !== 0 ? (
          <MapViewOfTrip polyline={speTrip.polyline}/>
          
      ) : (
        <Text>Could not fetch from fire</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 28,
  },
});

export default DetailedScreen;
