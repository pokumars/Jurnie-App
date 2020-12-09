/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { White, MaterialRed800 } from '../components/Colors';
import color from '../constants/color';
import getDirections, { getIconByMode } from '../helpers/tmdHelpers';

const MapViewOfTrip = ({ trip }) => {
  const [mapdata, setMapdata] = useState({});

  const PROVIDER_GOOGLE = 'google';

  useEffect(() => {
    const getData = async () => {
      const result = await getDirections(trip.polyline);
      setMapdata(result);
      console.log('results', result.polyline);
      console.log('trip', trip);
    };
    getData();
  }, []);

  const styles = StyleSheet.create({
    map: {
      flex: 5,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    makerText: { backgroundColor: MaterialRed800, padding: 4, width: 120, color: White },
    makerImage: { height: 48, width: 48 },
    text: { color: White },
  });

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      showsUserLocation
      region={mapdata.region}>
      {mapdata.polyline && (
        <Polyline coordinates={mapdata.polyline} strokeColor={color.MANGO_TANGO} strokeWidth={6} />
      )}
      {mapdata.polyline && (
        <Marker coordinate={mapdata.polyline[0]}>
          <View style={styles.makerText}>
            <Text style={styles.text}>{`Origin:\n${mapdata.origin}`}</Text>
          </View>
          <Image source={getIconByMode(trip.activityType)} style={styles.makerImage} />
        </Marker>
      )}
      {mapdata.polyline && trip.activityType !== 'stationary' && (
        <Marker coordinate={mapdata.polyline[mapdata.polyline.length - 1]}>
          <View style={styles.makerText}>
            <Text style={styles.text}>{`Destination:\n${mapdata.destination}`}</Text>
          </View>
          <Image source={getIconByMode(trip.activityType)} style={styles.makerImage} />
        </Marker>
      )}
    </MapView>
  );
};

export default MapViewOfTrip;
