import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';

import Avatar from 'components/Avatar';
import { DefaultCard } from 'components/Cards';
import { Emperor, Fire, Grenadier } from 'components/Colors';
import {
  Center,
  DefaultContainer,
  InlineS,
  InlineM,
  InlineL,
  Row,
  StackS,
  StackM,
} from 'components/Spacing';
import { BoldText, TextXS, TextXXS } from 'components/Text';
import { formatScore } from 'helpers';

const testData = [
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test1',
    name: 'Very Long Long Long Name',
    score: 123456,
  },
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test2',
    name: 'Zakaria',
    score: 10345,
  },
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test3',
    name: 'Tamanji',
    score: 1213,
  },
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test4',
    name: 'Oheneba',
    score: 43,
  },
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test5',
    name: 'Very Long Name',
    score: 43,
  },
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test6',
    name: 'Very Long Name',
    score: 43,
  },
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test7',
    name: 'Very Long Name',
    score: 43,
  },
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test8',
    name: 'Very Long Name',
    score: 43,
  },
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test9',
    name: 'Very Long Name',
    score: 43,
  },
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test10',
    name: 'Very Long Name',
    score: 43,
  },
  {
    avatarUri:
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    id: 'test11',
    name: 'Very Long Name',
    score: 43,
  },
];
const LeaderboardScreen = ({ navigation }) => (
  <ScreenContainer>
    <FlatList
      data={testData}
      keyExtractor={(item) => item.id}
      {...{ renderItem }}
    />
  </ScreenContainer>
);

const ScreenContainer = styled.View`
  ${DefaultContainer};
  padding-top: ${StackM}px;
`;

const renderItem = ({ item, index }) => (
  <LeaderboardCard>
    <RankingText>{index + 1}</RankingText>
    <AvatarContainer>
      <Avatar size={InlineL} source={{ uri: item.avatarUri }} />
    </AvatarContainer>
    <NameText numberOfLines={1}>{item.name}</NameText>
    <ScoreText>{formatScore(item.score)}</ScoreText>
  </LeaderboardCard>
);

const LeaderboardCard = styled(DefaultCard)`
  ${Row};
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.marginBottom || StackS}px;
`;

const SmallBoldText = styled(BoldText)`
  font-size: ${TextXS}px;
`;

const SmallText = styled.Text`
  font-size: ${TextXS}px;
`;

const RankingText = styled(SmallBoldText)`
  color: ${Grenadier};
  flex: 1;
  padding-right: ${InlineS}px;
`;

const AvatarContainer = styled.View`
  ${Center};
  flex: 1;
`;

const NameText = styled(SmallText)`
  color: ${Emperor};
  flex: 5;
  padding-left: ${InlineM}px;
  padding-right: ${InlineM}px;
  text-align: left;
`;

const ScoreText = styled.Text`
  color: ${Fire};
  font-size: ${TextXXS}px;
  flex: 2;
  text-align: right;
`;

export default LeaderboardScreen;
