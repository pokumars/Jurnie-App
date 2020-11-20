import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { COLOR, GLOBAL_STYLE, NAVIGATION_ROUTE } from 'app-constants';

function CustomizedTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={[styles.tabBar, GLOBAL_STYLE.ROW]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let imageSource;

        switch (route.name) {
          case NAVIGATION_ROUTE.HOME:
            imageSource = isFocused
              ? require('../../assets/icons/homeActive.png')
              : require('../../assets/icons/home.png');
            break;
          case NAVIGATION_ROUTE.MY_TRIPS:
            imageSource = isFocused
              ? require('../../assets/icons/myTripsActive.png')
              : require('../../assets/icons/myTrips.png');
            break;
          case NAVIGATION_ROUTE.LEADERBOARD:
            imageSource = isFocused
              ? require('../../assets/icons/leaderboardActive.png')
              : require('../../assets/icons/leaderboard.png');
            break;
          case NAVIGATION_ROUTE.PROFILE:
            imageSource = isFocused
              ? require('../../assets/icons/profileActive.png')
              : require('../../assets/icons/profile.png');
            break;
          default:
            imageSource = null;
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            key={route.name}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}>
            <FastImage source={imageSource} style={styles.tabBarIcon} />
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? COLOR.STEEL_BLUE : COLOR.JUMBO },
              ]}>
              {label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLOR.WHITE,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabBarIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default CustomizedTabBar;
