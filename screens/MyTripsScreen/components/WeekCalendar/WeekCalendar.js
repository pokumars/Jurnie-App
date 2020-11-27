import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';
import { isSameDay } from 'date-fns';

import { Black, Emperor, RoyalBlue, Silver, White } from 'components/Colors';
import {
  Center,
  InlineXS,
  InlineL,
  Row,
  StackS,
  StackM,
} from 'components/Spacing';
import { BoldText, TextXXS } from 'components/Text';
import { getWeekDays } from 'helpers';
import { StyleSheet } from 'react-native';

/*
  type WeekDate = {
    formated: string;
    date: Date;
    day: number;
  }

  {"date": 2020-11-24T22:00:00.000Z, "day": 25, "formated": "Wed"}
*/

const WeekCalendar = ({ currentDate, selectedDate, setSelectedDate }) => {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    const weekDays = getWeekDays(currentDate);
    setWeek(weekDays);
  }, [currentDate]);

  return (
    <Container>
      {week.map((weekDay) => {
        const isToday = isSameDay(weekDay.date, currentDate);
        const isSelectedDate =
          selectedDate.getTime() === weekDay.date.getTime();
        return (
          <DateContainer key={weekDay.formated}>
            <DateText>{weekDay.formated}</DateText>
            <DayButton
              {...{ isToday, isSelectedDate, setSelectedDate, weekDay }}
            />
          </DateContainer>
        );
      })}
    </Container>
  );
};

const Container = styled.View`
  ${Row};
  background-color: ${Silver};
  border-radius: 6px;
  margin-bottom: ${StackM}px;
  padding-bottom: ${StackS}px;
  padding-top: ${StackS}px;
`;

const DateContainer = styled.View`
  flex: 1;
`;

const DateText = styled.Text`
  color: ${Emperor};
  font-size: 14px;
  text-align: center;
`;

const DayButton = ({ isToday, isSelectedDate, setSelectedDate, weekDay }) => {
  const dayContainerStyle = [];
  const dayTextStyle = [];

  const disabled = weekDay.date.getTime() > new Date().getTime();

  if (isToday) {
    dayContainerStyle.push(styles.todayDayContainer);
    dayTextStyle.push(styles.todayDayText);
  }

  if (isSelectedDate) {
    dayContainerStyle.push(styles.selectedDayContainer);
    dayTextStyle.push(styles.selectedDayText);
  }

  if (disabled) {
    dayTextStyle.push(styles.disabledDayText);
  }

  const onPress = () => {
    setSelectedDate(weekDay.date);
  };

  return (
    <DayButtonWrapper {...{ disabled, onPress }}>
      <DayButtonContainer style={dayContainerStyle}>
        <DayText style={dayTextStyle}>{weekDay.day}</DayText>
      </DayButtonContainer>
    </DayButtonWrapper>
  );
};

const DayButtonWrapper = styled.TouchableOpacity`
  ${Center}
`;

const DayButtonContainer = styled.View`
  padding-top: ${InlineXS}px;
`;

const DayText = styled(BoldText)`
  color: ${Black};
  font-size: ${TextXXS}px;
  text-align: center;
`;

const styles = StyleSheet.create({
  disabledDayText: {
    color: Emperor,
  },
  selectedDayContainer: {
    backgroundColor: RoyalBlue,
    borderRadius: InlineL / 2,
    height: InlineL,
    width: InlineL,
  },
  selectedDayText: {
    color: White,
  },
  todayDayContainer: {},
  todayDayText: {
    color: RoyalBlue,
  },
});

export default WeekCalendar;
