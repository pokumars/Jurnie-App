/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import { decode } from '@mapbox/polyline';

const getDirections = async (polyline) => {
  const getAddress = async (latitude, longitude) => {
    // eslint-disable-next-line no-undef
    const data = await fetch(
      `http://api.digitransit.fi/geocoding/v1/reverse?point.lat=${latitude}&point.lon=${longitude}&size=1`,
    );
    return data.json();
  };

  try {
    // decodes an encoded polyline into an array of geo coordinates for a mobility route of an activity
    const points = await decode(polyline);
    const coordinates = points.map((point) => ({
      latitude: point[0],
      longitude: point[1],
    }));
    console.log('coords', coordinates);

    // the coordinates of the origin and destination from the polyline
    const coordsOrigin = points[0];
    const coordsDestination = points[points.length - 1];

    const origin = await getAddress(coordsOrigin[0], coordsOrigin[1]);
    const destination = await getAddress(
      coordsDestination[0],
      coordsDestination[1],
    );
    console.log('address', destination.features[0].properties.label);

    // parameters to specify the area over which a geo map is drawn
    const region = {
      latitude: coordsOrigin[0],
      longitude: coordsOrigin[1],
      latitudeDelta: 0.004555555,
      longitudeDelta: 0.00455555,
    };

    const data = {
      polyline: coordinates,
      origin: origin.features[0].properties.label,
      destination: destination.features[0].properties.label,
      originMetaData: origin,
      destinationMetadata: destination,
      region,
    };
    // setMapdata(data);
    return data;
  } catch (error) {
    console.error('err', error);
    return error;
  }
};

const getIconByMode = (mode) => {
  switch (mode) {
    case 'stationary':
      return require('assets/icons/sitting-man.png');

    case 'non-motorized/bicycle':
      return require('assets/icons/bicycle.png');

    case 'non-motorized/pedestrian':
      return require('assets/icons/walk.png');

    case 'non-motorized/pedestrian/walk':
      return require('assets/icons/walk.png');

    case 'non-motorized/pedestrian/run':
      return require('assets/icons/run.png');

    case 'motorized/road/car':
      return require('assets/icons/car.png');

    case 'motorized/road/bus':
      return require('assets/icons/bus.png');

    case 'motorized/rail':
      return require('assets/icons/rail.png');

    case 'motorized/rail/tram':
      return require('assets/icons/tram.png');

    case 'motorized/rail/train':
      return require('assets/icons/rail.png');

    case 'motorized/rail/metro':
      return require('assets/icons/underground.png');

    case 'motorized/air/plane':
      return require('assets/icons/plane.png');

    default:
      return require('assets/icons/unknown.png');
  }
};

export { getDirections as default, getIconByMode };
