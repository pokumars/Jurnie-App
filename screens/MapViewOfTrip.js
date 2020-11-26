import React, { useEffect, useState, useRef } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { decode } from '@mapbox/polyline';
import color from '../constants/color';

const endcodedPolyline =
  'ommnJqsnuC\\?Hx@Of@UOQcAOeAKw@Gi@UsAWqAGs@Ke@SiAGyAGiAGo@S{AIuACiAd@k@f@OV_@XQAv@O\\Kl@Ih@Od@iAAj@n@VFRnAH~@VdAJhATz@f@}@p@]';

const MapViewOfTrip = () => {
  const [mapdata, setMapdata] = useState({});

  const PROVIDER_GOOGLE = 'google';

  const getDirections = async (encodedGeolocation) => {
    const getAddress = async (latitude, longitude) => {
      // eslint-disable-next-line no-undef
      const data = await fetch(
        `http://api.digitransit.fi/geocoding/v1/reverse?point.lat=${latitude}&point.lon=${longitude}&size=1`
      );
      return data.json();
    };

    let data;
    try {
      // decodes an encoded polyline into an array of geo coordinates for a mobility route of an activity
      const points = await decode(encodedGeolocation);
      const coordinates = points.map((point) => ({ latitude: point[0], longitude: point[1] }));
      console.log('coords', coordinates);

      // the coordinates of the origin and destination from the polyline
      const coordsOrigin = points[0];
      const coordsDestination = points[points.length - 1];

      const origin = await getAddress(coordsOrigin[0], coordsOrigin[1]);
      const destination = await getAddress(coordsDestination[0], coordsDestination[1]);
      console.log('address', destination.features[0].properties.label);

      // parameters to specify the area over which a geo map is drawn
      const region = {
        latitude: coordsOrigin[0],
        longitude: coordsOrigin[1],
        latitudeDelta: 0.004555555,
        longitudeDelta: 0.00455555,
      };

      data = {
        polyline: coordinates,
        origin: origin.features[0].properties.label,
        destination: destination.features[0].properties.label,
        originMetaData: origin,
        destinationMetadata: destination,
        region,
      };
      setMapdata(data);
      return data;
    } catch (error) {
      console.error('err', error);
      return error;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await getDirections(endcodedPolyline);
      setMapdata(result);
      console.log('results', result);
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
        initialRegion={mapdata.region}>
        {mapdata.polyline && (
          <Polyline
            coordinates={mapdata.polyline}
            strokeColor={color.MANGO_TANGO}
            strokeWidth={6}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapViewOfTrip;
