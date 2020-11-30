/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import color from '../constants/color';
import getDirections from '../utils/helper';

const MapViewOfTrip = (endcodedPolyline) => {
  const [mapdata, setMapdata] = useState({});

  const PROVIDER_GOOGLE = 'google';

  useEffect(() => {
    const getData = async () => {
      const result = await getDirections(endcodedPolyline);
      setMapdata(result);
      console.log('results', result.polyline);
    };
    getData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 600,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        region={mapdata.region}>
        {mapdata.polyline && (
          <Polyline
            coordinates={mapdata.polyline}
            strokeColor={color.MANGO_TANGO}
            strokeWidth={6}
          />
        )}
        {mapdata.polyline && (
          <Marker
            coordinate={mapdata.polyline[0]}
            image={require('../assets/icons/bicycle.png')}
            pinColor={color.MINE_SHAFT}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapViewOfTrip;
