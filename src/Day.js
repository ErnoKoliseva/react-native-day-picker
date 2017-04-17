'use strict';

import React    from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Text
}               from 'react-native';

export default class Day extends React.Component {
	render() {
		let {date, status, disabled, onDayPress, width} = this.props;
		let onPress, textColor, backColor, borderColor;

		if (disabled) {
			if (status !== 'applicationStartDateInPast') {
				status = 'disabled';
				onPress = null;
			}
			if (status === 'applicationStartDateInPast') {
				status = 'applicationStartDateInPast';
				onPress = null;
			}

		}
		else {
			onPress = () => {
				onDayPress(date);
			}
		}

		switch (status) {
			case 'disabled':
				backColor = this.props.dayDisabledBackColor;
				textColor = this.props.dayDisabledTextColor;
                		borderColor = this.props.dayDisabldBorderColor;
				break;

			case 'common':
				backColor = this.props.dayCommonBackColor;
				textColor = this.props.dayCommonTextColor;
                		borderColor = this.props.dayCommonBorderColor;
				break;

			case 'selected':
				backColor = this.props.daySelectedBackColor;
				textColor = this.props.daySelectedTextColor;
                		borderColor = this.props.daySelectedBorderColor;
				break;

			case 'inWeek':
				backColor = this.props.dayInWeekBackColor;
				textColor = this.props.dayInWeekTextColor;
                		borderColor = this.props.dayInWeekBorderColor;
				break;

			case 'applicationStartDateInPast':
				backColor = this.props.applicationStartDateInPastBackColor;
				textColor = this.props.applicationStartDateInPastTextColor;
				borderColor = this.props.applicationStartDateInPastBorderColor;
				break;
		}

		return (
			<TouchableOpacity
				activeOpacity={disabled ? 1 : 0.5}
				style={[styles.common, {backgroundColor: backColor, borderColor: borderColor, borderWidth: 1, width: width / 7, height: width / 7}]}
				onPress={onPress}>
				<Text style={{color: textColor}}>{date.getDate()}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	common: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	}
});
