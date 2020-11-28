import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  /*const GetCurrent = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .orderBy('dateAdded', 'desc')
      .limit(1)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        // console.log(data);

        setcurrentTrip(data);
        // console.log('kkkkk', data);
      });
  };*/

  return (
    <View>
      {speTrip.length !== 0 ? (
        <>
          {speTrip.feedGiven == false ? (
            <Button
              onPress={() =>
                navigation.navigate('Questionnaire', {
                  paramKey: speTrip.id,
                })
              }
              title="Give feedback"></Button>
          ) : (
            <Button
              onPress={() =>
                navigation.navigate('Questionnaire', {
                  paramKey: speTrip.id,
                })
              }
              title="Update feedback"></Button>
          )}

          <Text style={{ fontSize: 20 }}>Mode : {speTrip.activityType}</Text>
          <Text style={{ fontSize: 20 }}>timestart : {speTrip.timestart}</Text>
          <Text style={{ fontSize: 20 }}>timeEnd : {speTrip.timeEnd}</Text>
          <Text style={{ fontSize: 20 }}>distance : {speTrip.distance}</Text>
          <Text style={{ fontSize: 20 }}>duration : {speTrip.duration}</Text>
          <Text style={{ fontSize: 20 }}>speed : {speTrip.speed}</Text>
        </>
      ) : (
        <Text>Could not fetch from fire</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
