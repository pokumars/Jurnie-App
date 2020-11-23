import React from 'react';

import styled from 'styled-components/native';

import { Black, Silver, White } from 'components/Colors';
import { InlineS, InlineM, InlineL, Row, StackS } from 'components/Spacing';
import { TextS } from 'components/Text';
import TransportTile from 'components/TransportTile';
import {
  determineTransportBackgroundColorForDarkIcon,
  determineTransportIcon,
} from 'helpers';

/**
 *
 * @param {string} prop.destination - name of the location of destination
 * @param {string} prop.origin - name of the location of origin
 * must be {uri: 'https://smth.dev/logo.png'}
 *
 */

const TripCard = (props) => {
  const { destination, meansOfTransport, origin } = props;
  return (
    <TripCardContainer>
      <Locations {...{ destination, origin }} />
      <MeansOfTransport {...{ meansOfTransport }} />
    </TripCardContainer>
  );
};

const TripCardContainer = styled.View`
  background-color: ${Silver};
  border-radius: 12px;
  padding: ${InlineM}px;
`;

const Locations = (props) => (
  <TextContainer>
    <OriginText>{props.origin}</OriginText>
    <DestinationText>{props.destination}</DestinationText>
  </TextContainer>
);

const TextContainer = styled.View`
  ${Row};
  justify-content: space-between;
  margin-bottom: ${StackS}px;
`;

const CommonText = styled.Text`
  font-size: ${TextS}px;
`;

const OriginText = CommonText;
const DestinationText = CommonText;

const MeansOfTransport = (props) => {
  const { meansOfTransport } = props;
  // const totalTravelingTime = meansOfTransport
  //   .map((transport) => transport.time)
  //   .reduce((accumulator, currentValue) => accumulator + currentValue);

  return (
    <MeansOfTransportContainer>
      {meansOfTransport.map((transport, index) => (
        <TransportTile
          backgroundColor={determineTransportBackgroundColorForDarkIcon(
            transport.type,
          )}
          height={InlineL}
          key={transport.type}
          source={determineTransportIcon(transport.type)}
          tintColor={Black}
          width={InlineL}
          style={{
            marginLeft: index === 0 ? 0 : InlineS,
            flex: transport.time,
          }}
        />
      ))}
    </MeansOfTransportContainer>
  );
};

const MeansOfTransportContainer = styled.View`
  ${Row};
  background-color: ${White};
  padding: ${InlineS}px;
`;

export default TripCard;
