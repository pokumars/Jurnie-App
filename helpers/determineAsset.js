import { BADGE, MEANS_OF_TRANSPORT } from 'app-constants';
import { Celery, Dandelion, FireBush, White, Zinnwaldite } from 'components/Colors';

export const determineTransportIcon = (transportType) => {
  switch (transportType) {
    case MEANS_OF_TRANSPORT.BUS:
      return require('assets/icons/bus-white.png');
    case MEANS_OF_TRANSPORT.CAR:
      return require('assets/icons/car.png');
    case MEANS_OF_TRANSPORT.TRAIN:
      return require('assets/icons/train.png');
    case MEANS_OF_TRANSPORT.WALK:
      return require('assets/icons/walk.png');
    default:
      return null;
  }
};

export const determineTransportBackgroundColorForDarkIcon = (transportType) => {
  switch (transportType) {
    case MEANS_OF_TRANSPORT.BUS:
      return FireBush;
    case MEANS_OF_TRANSPORT.CAR:
      return Zinnwaldite;
    case MEANS_OF_TRANSPORT.TRAIN:
      return Celery;
    case MEANS_OF_TRANSPORT.WALK:
      return Dandelion;
    default:
      return White;
  }
};

export const determineBadgeIcon = (badgeSymbol) => {
  switch (badgeSymbol) {
    case BADGE.CAMERA:
      return require('assets/icons/badge-camera.png');
    case BADGE.MEDAL:
      return require('assets/icons/badge-medal.png');
    case BADGE.TARGET:
      return require('assets/icons/badge-target.png');
    case BADGE.TROPHY:
      return require('assets/icons/badge-trophy.png');
    default:
      return null;
  }
};
