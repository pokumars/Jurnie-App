import React, { useState } from 'react';
import { Text, View, FlatList, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Item = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={{ fontSize: 28 }}>{title}</Text>
  </TouchableOpacity>
);

const MyTripsScreen = ({ navigation }) => {
  const [currentTrip, setcurrentTrip] = useState();
  const [selectedId, setselectedId] = useState(null);

  const renderItem = ({ item }) => (
    <Item title={item.timeEnd} onPress={() => setselectedId(item.id)} />
  );

  const GetCurrent = () => {
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
  };

  return (
    <View>
      <Text>MyTripsScreen</Text>
      <Button title="get" onPress={() => GetCurrent()} />
      <FlatList
        data={currentTrip}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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

export default MyTripsScreen;
