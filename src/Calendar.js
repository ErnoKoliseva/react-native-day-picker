'use strict';

import React, {
	PropTypes
} from 'react';
import {
	ListView,
	StyleSheet,
} from 'react-native';

import Month  from './Month';
import Moment from 'moment';


export default class Calendar extends React.Component {
	static defaultProps = {
		startDate: new Date(),
		monthsCount: 24,
		onSelectionChange: () => {
		},

		currentDate: new Date(),
		applicationStartDate: new Date,

		monthsLocale: ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'],
		weekDaysLocale: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

		width: 280,

		bodyBackColor: 'white',
		bodyTextColor: 'black',
		headerSepColor: 'grey',

		monthTextColor: 'black',

		dayCommonBackColor: 'white',
		dayCommonTextColor: 'black',
		dayCommonBorderColor: 'black',

		dayDisabledBackColor: 'white',
		dayDisabledTextColor: 'grey',
		dayDisabldBorderColor: 'grey',

		daySelectedBackColor: '#00B240',
		daySelectedTextColor: 'white',
		daySelctedBorderColor: '#00B240',

		dayInWeekBackColor: '#00B240',
		dayInWeekTextColor: 'white',
		dayInWeekBorderColor: '#00B240',

		applicationStartDateBackColor: 'white',
		applicationStartDateTextColor: 'black',
		applicationStartDateBorderColor: 'black',

		isFutureDate: false,
		weekSelect: true
	};

	static propTypes = {
		selectFrom: PropTypes.instanceOf(Date),
		selectTo: PropTypes.instanceOf(Date),

		monthsCount: PropTypes.number,
		startDate: PropTypes.instanceOf(Date),

		currentDate: PropTypes.instanceOf(Date),
		applicationStartDate: PropTypes.instanceOf(Date),

		monthsLocale: PropTypes.arrayOf(PropTypes.string),
		weekDaysLocale: PropTypes.arrayOf(PropTypes.string),
		startFromMonday: PropTypes.bool,

		onSelectionChange: PropTypes.func,

		width: PropTypes.number,

		bodyBackColor: PropTypes.string,
		bodyTextColor: PropTypes.string,
		headerSepColor: PropTypes.string,

		monthTextColor: PropTypes.string,

		dayCommonBackColor: PropTypes.string,
		dayCommonTextColor: PropTypes.string,
		dayCommonBorderColor: PropTypes.string,

		dayDisabledBackColor: PropTypes.string,
		dayDisabledTextColor: PropTypes.string,
		dayDisabledBorderColor: PropTypes.string,

		daySelectedBackColor: PropTypes.string,
		daySelectedTextColor: PropTypes.string,
		daySelectedBorderColor: PropTypes.string,

		dayInWeekBackColor: PropTypes.string,
		dayInWeekTextColor: PropTypes.string,
		dayInWeekBorderColor: PropTypes.string,

		applicationStartDateTextColor: PropTypes.string,
		applicationStartDateBackColor: PropTypes.string,
		applicationStartDateBorderColor: PropTypes.string,

		isFutureDate: PropTypes.bool,
		weekSelect: PropTypes.bool
	};

	constructor(props) {
		super(props);

		this.changeSelection = this.changeSelection.bind(this);
		this.generateMonths = this.generateMonths.bind(this);

		let {selectFrom, selectTo, monthsCount, startDate, currentDate, applicationStartDate} = this.props;

		this.selectFrom = selectFrom;
		this.selectTo = selectTo;
		this.months = this.generateMonths(monthsCount, startDate);
		this.currentDate = currentDate;
		this.applicationStartDate = applicationStartDate;

		var dataSource = new ListView.DataSource({rowHasChanged: this.rowHasChanged});

		this.state = {
			dataSource: dataSource.cloneWithRows(this.months)
		}
	}

	rowHasChanged(r1, r2) {
		for (var i = 0; i < r1.length; i++) {
			if (r1[i].status !== r2[i].status && !r1[i].disabled) {
				return true;
			}
		}
	}

	generateMonths(count, startDate) {
		var months = [];
		var dateUTC;
		var monthIterator = startDate;
		var {isFutureDate, startFromMonday} = this.props;

		var startUTC = Date.UTC(startDate.getYear(), startDate.getMonth(), startDate.getDate());

		for (var i = 0; i < count; i++) {
			var month = this.getDates(monthIterator, startFromMonday);

			months.push(month.map((day) => {
				dateUTC = Date.UTC(day.getYear(), day.getMonth(), day.getDate());
				return {
					date: day,
					status: this.getStatus(day, this.selectFrom, this.selectTo),
					disabled: day.getMonth() !== monthIterator.getMonth()
					|| ((isFutureDate) ? startUTC > dateUTC : startUTC < dateUTC)
				}
			}));

			if (isFutureDate) {
				monthIterator.setMonth(monthIterator.getMonth() + 1);
			} else {
				monthIterator.setMonth(monthIterator.getMonth() - 1);
			}
		}

		return months;
	}

	getDates(month, startFromMonday) {
		month = new Date(month);
		month.setDate(1);

		var delta = month.getDay();
		if (startFromMonday) {
			delta--;
			if (delta === -1) delta = 6;
		}

		var startDate = new Date(month);
		startDate.setDate(startDate.getDate() - delta);

		month.setMonth(month.getMonth() + 1);
		month.setDate(0);

		delta = 6 - month.getDay();
		if (startFromMonday) {
			delta++;
			if (delta === 7) delta = 0;
		}

		var lastDate = new Date(month);
		lastDate.setDate(lastDate.getDate() + delta);

		var allDates = [];
		while (startDate <= lastDate) {
			allDates.push(new Date(startDate));
			startDate.setDate(startDate.getDate() + 1);
		}
		return allDates;
	}

	changeSelection(value) {
		var {selectFrom, selectTo, months} = this;

		if(this.props.weekSelect) {
						if(value.getDay() != 1) {
								if(value.getDay() == 0) {
										const monday = Moment(value).startOf('isoWeek');
										selectFrom = new Date(monday);
										selectTo = value;
								} else {
										const monday = Moment(value).startOf('isoWeek');
										const sunday = Moment(value).day(7);
										selectFrom = new Date(monday);
										selectTo = new Date(sunday);
								}
						} else {
								const sunday = Moment(value).day(7);
								selectFrom = value;
								selectTo = new Date(sunday);
						}
		} else {
						if (!selectFrom) {
								selectFrom = value;
						} else if (!selectTo) {
								if (value > selectFrom) {
										selectTo = value;
								} else {
										selectFrom = value;
								}
						} else if (selectFrom && selectTo) {
								selectFrom = value;
								selectTo = null;
						}
		}

		months = months.map((month) => {
			return month.map((day) => {
				return {
					date: day.date,
					status: this.getStatus(day.date, selectFrom, selectTo),
					disabled: day.disabled
				}
			})
		});

		if (this.props.weekSelect) {
			this.selectFrom = selectFrom;
			this.selectTo = selectTo;
		} else {
			this.selectFrom = this.selectTo = selectFrom;
		}

		this.months = months;

		this.props.onSelectionChange(value, this.prevValue);
		this.prevValue = value;

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(months)
		});
	}

	getStatus(date, selectFrom, selectTo) {
		var { applicationStartDate, currentDate } = this;
		if (selectFrom) {
			if (selectFrom.toDateString() === date.toDateString()) {
				return 'selected';
			}
		}
		if (selectTo) {
			if (selectTo.toDateString() === date.toDateString()) {
				return 'selected';
			}
		}
		if (selectFrom && selectTo) {
			if (selectFrom < date && date < selectTo) {
				return 'inWeek';
			}
		}
		if (applicationStartDate <= date && date < currentDate) {
				return 'applicationStartDateInPast';
		}
		return 'common';
	}

	render() {
		let {style, isFutureDate} = this.props;
		let directionStyles = {};

		if (!isFutureDate) {
			directionStyles = {
				transform: [{scaleY: -1}]
			}
		}

        console.log(this.props);
		return (
			<ListView
				initialListSize={5}
				scrollRenderAheadDistance={1200}
				style={[styles.listViewContainer, directionStyles, style]}
				dataSource={this.state.dataSource}
				renderRow={(month) => {
					return (
						<Month
							{...this.props}
							days={month}
							style={[styles.month, directionStyles]}
							changeSelection={this.changeSelection}
						/>
					);
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	listViewContainer: {
		backgroundColor: 'white',
		alignSelf: 'center',
	},
	month: {}
});
