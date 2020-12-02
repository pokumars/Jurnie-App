import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialRed100, MaterialOrange100, LightPink } from '../components/Colors';
import MapViewOfTrip from './MapViewOfTrip';

const DetailedScreen = ({ route }) => {
  const [trip, setTrip] = useState();

  useEffect(function Fetchtrip() {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .doc(route.params.paramKey)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data();

        console.log('data', data);

        setTrip(data);
      });
  }, []);

  const tripItem = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: LightPink,
    padding: 6,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 4,
    },
    tripItemsContainer: {
      flex: 1,
      padding: 8,
    },
    tripItem1: { ...tripItem },
    tripItem2: { ...tripItem, backgroundColor: MaterialOrange100 },
    tripItem3: { ...tripItem, backgroundColor: MaterialRed100 },
    item: {
      fontSize: 20,
    },
    noDataView: {
      flex: 1,
      alignItems: 'center',
    },
  });

  if (trip) {
    return (
      <View style={styles.container}>
        <View style={styles.map}>
          <MapViewOfTrip trip={trip} />
        </View>
        <View style={styles.tripItemsContainer}>
          <View style={styles.tripItem1}>
            <Text style={styles.item}>Duration</Text>
            <Text style={styles.item}>{trip.duration}</Text>
          </View>
          <View style={styles.tripItem2}>
            <Text style={styles.item}>carbon footprint</Text>
            <Text style={styles.item}>{trip.co2}</Text>
          </View>
          <View style={styles.tripItem3}>
            <Text style={styles.item}>speed</Text>
            <Text style={styles.item}>{trip.speed}</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.noDataView}>
      <Text style={styles.item}>Loading data ...</Text>
    </View>
  );
};

export default DetailedScreen;
