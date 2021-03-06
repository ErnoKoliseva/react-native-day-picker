# react-native-day-picker

react-native-day-picker is a simple calendar which allows you to select both days and weeks.

This is a fork from https://github.com/ivanchenko/react-native-day-picker that has been highly modified for custom needs.

![Demo gif](https://github.com/ErnoKoliseva/react-native-day-picker/blob/master/week-picker.gif?raw=true)

## Usage

```javascript
'use strict';

import React from 'react';
import {
    View,
    StyleSheet,
    AppRegistry
} from 'react-native';

import Calendar from './src/Calendar';


class DayPicker extends React.Component {
    render() {
        var from = new Date();
        from.setDate(from.getDate() - 16);
        var to = new Date();

        var startDate = new Date();
        startDate.setMonth(startDate.getMonth() + 1);

        return (
            <View style={styles.container}>
                <Calendar
                    monthsCount={24}
                    startFormMonday={true}
                    startDate={startDate}
                    selectFrom={from}
                    selectTo={to}
                    width={350}
                    onSelectionChange={(current, previous) => {
                        console.log(current, previous);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    }
});
```
## Properties

All properties are optional

- **`onSelectionChange`** _(func)_ — Function which will be executed on day click. First param is clicked day date, second one previous clicked day.

- **`startDate`** _(Date)_ — Date from which you can select dates. By default is **new Date()**.

- **`currentDate`** _(Date)_ — Static property for current date **.

- **`applicationStartDate`** _(Date)_ — Needed a property for a day that might or might not be in past but looks visually different than normal disabled days. **new Date()**.

- **`width`** _(number)_ Calendars width, should be **divided on 7 without remainder** or may cause unpredictable behaviour.

- **`selectFrom`** _(Date)_ — First day in range that will be selected from start.

- **`selectTo`** _(Date)_ — Last day in range that will be selected from start.

- **`monthsCount`** _(number)_ — Count of dates from current months to the last.

- **`startFromMonday`** _(bool)_ — If true than months will started from monday.

- **`monthsLocale`** _(arrayOf(string))_ — Strings for localization, which will be displayed in month header started from January.

- **`weekDaysLocale`** _(arrayOf(string))_ — Strings for localization, which will be displayed in week day header, started from sunday.

- **`isFutureDate`** _(boolean)_ — True if you want to select a future date. By default is **false**.=======

- **`weekSelect`** _(bool)_ — True if you want to select weeks, false if you want to select single dates.


### Colors
 
- **`bodyBackColor`** _(string)_ — Calendar background color.

- **`bodyTextColor`** _(string)_ — Calendar headers text color.

- **`headerSepColor`** _(string)_ — Calendar header separator color.
 
- **`dayCommonBackColor`** _(string)_ — Not selected day background color.

- **`dayCommonTextColor`** _(string)_ — Not Selected day text color.

- **`dayCommonBorderColor`** _(string)_ — Not selected border color
 
- **`dayDisabledBackColor`** _(string)_ — Disabled day background color.

- **`dayDisabledTextColor`** _(string)_ — Disabled day text color.

- **`dayDisabledBorderColor`** _(string)_ — Disabled day border color
 
- **`daySelectedBackColor`** _(string)_ — First and last day in range background color.

- **`daySelectedTextColor`** _(string)_ — First and last day in range text color.

- **`daySelectedBorderColor`** _(string)_ — Selected border color
 
- **`dayInWeekBackColor`** _(string)_ — In week day background color.

- **`dayInWeekTextColor`** _(string)_ — In week day text color.

- **`dayInWeekBorderColor`** _(string)_ — In week border color

- **`monthTextColor`** _(string)_ — Calendar month header text color.

## Support

Email erno@ernokoliseva.net for support.
