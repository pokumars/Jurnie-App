import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import styled from 'styled-components';

import Avatar from 'components/Avatar';
import { ButtonContainer, ButtonWrapper } from 'components/Button';
import { DefaultCard } from 'components/Cards';
import { Emperor, Fire, Grenadier } from 'components/Colors';
import Icon from 'components/Icon';
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
import firestore from '@react-native-firebase/firestore';

const LeaderboardScreen = ({ navigation }) => {
  useEffect(function Fetchusers() {
    firestore()
      .collection('users')
      .orderBy('totalFeeds', 'desc')
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log('AAAAA', data);

        setusers(data);
        if (data[0].profileImgUrl == '') {
          console.log('yes');
        }
        // console.log('kkkkk', currentTrip);
      });
  }, []);

  const [users, setusers] = useState();
  const [data, setData] = useState([
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test1',
      name: 'Very Long Long Long Name',
      score: 123456,
    },
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test2',
      name: 'Zakaria',
      score: 10345,
    },
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test3',
      name: 'Tamanji',
      score: 1213,
    },
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test4',
      name: 'Oheneba',
      score: 43,
    },
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test5',
      name: 'Very Long Name',
      score: 43,
    },
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test6',
      name: 'Very Long Name',
      score: 43,
    },
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test7',
      name: 'Very Long Name',
      score: 43,
    },
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test8',
      name: 'Very Long Name',
      score: 43,
    },
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test9',
      name: 'Very Long Name',
      score: 43,
    },
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test10',
      name: 'Very Long Name',
      score: 43,
    },
    {
      avatarUri: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      id: 'test11',
      name: 'Very Long Name',
      score: 43,
    },
  ]);

  const onLoadMoreButtonPress = () => {};

  const renderItem = ({ item, index }) =>
    index === users.length - 1 ? (
      <>
        <LeaderboardCard {...{ item, index }} />
        <LoadMoreButton onPress={onLoadMoreButtonPress} />
      </>
    ) : (
      <LeaderboardCard {...{ item, index }} />
    );

  return (
    <ScreenContainer>
      <FlatList data={users} keyExtractor={(item) => item.userName} {...{ renderItem }} />
    </ScreenContainer>
  );
};

const images = [
  require('assets/icons/walrus.png'),
  require('assets/icons/penguin.png'),
  require('assets/icons/ram.png'),
  require('assets/icons/owl.png'),
  require('assets/icons/fox.png'),
  require('assets/icons/sparrowhawk.png'),
  require('assets/icons/bear.png'),
  require('assets/icons/giraffe.png'),
];

const imageSelector = () => {
  const randomNumber = Math.floor(Math.random() * images.length);
  const selcted = images[randomNumber];
  return selcted;
};

const avatarUri = 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg';

const ScreenContainer = styled.View`
  ${DefaultContainer};
  padding-top: ${StackM}px;
`;

const LeaderboardCard = ({ item, index }) => (
  <LeaderboardCardContainer>
    <RankingText>{index + 1}</RankingText>
    <AvatarContainer>
      {item.profileImgUrl == '' ? (
        <Image size={InlineL} style={{ width: 40, height: 40 }} source={imageSelector()} />
      ) : (
        <Avatar size={InlineL} source={{ uri: item.profileImgUrl }} />
      )}
    </AvatarContainer>
    <NameText numberOfLines={1}>{item.userName}</NameText>
    <ScoreText>{formatScore(item.totalFeeds)}</ScoreText>
  </LeaderboardCardContainer>
);

const LeaderboardCardContainer = styled(DefaultCard)`
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

const LoadMoreButton = ({ onPress }) => (
  <LoadMoreButtonWrapper {...{ onPress }}>
    <LoadMoreButtonContainer>
      <Icon
        size={{ width: LoadMoreButtonWidth, height: LoadMoreButtonHeight }}
        source={require('assets/icons/three-dots.png')}
      />
    </LoadMoreButtonContainer>
  </LoadMoreButtonWrapper>
);

const LoadMoreButtonWrapper = styled(ButtonWrapper)`
  ${Center};
  margin-top: ${StackS}px;
`;

const LoadMoreButtonWidth = InlineL;
const LoadMoreButtonHeight = LoadMoreButtonWidth / 5;

const LoadMoreButtonContainer = styled(ButtonContainer)`
  height: ${LoadMoreButtonWidth}px;
  width: ${LoadMoreButtonWidth}px;
`;

export default LeaderboardScreen;
