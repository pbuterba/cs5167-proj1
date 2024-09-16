const DAYS_OF_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function dateSuffix(date) {
    if(date.toString().endsWith('1') && !date.toString().endsWith('11')) {
        return 'st';
    } else if(date.toString().endsWith('2') && !date.toString().endsWith('12')) {
        return 'nd';
    } else if(date.toString().endsWith('3') && !date.toString().endsWith('13')) {
        return 'rd';
    } else {
        return 'th';
    }
}

export function getDateSlug(dateVal) {
    let month = dateVal.getMonth() + 1;
    let day = dateVal.getDate();
    let monthText;
    let dayText;
    if(month < 10) {
        monthText = "0" + month;
    } else {
        monthText = month.toString();
    }
    if(day < 10) {
        dayText = "0" + day;
    } else {
        dayText = day.toString()
    }
    return monthText + "-" + dayText + "-" + dateVal.getFullYear();
}

export function getDateText(dateVal) {
    let dayOfWeekText = DAYS_OF_WEEK[dateVal.getDay()];
    let monthText = MONTHS[dateVal.getMonth()];
    return dayOfWeekText + " " + monthText + " " + dateVal.getDate() + dateSuffix(dateVal.getDate()) + ", " + dateVal.getFullYear();
}

export function toTwelveHourTime(twentyFourHourTime) {
    let timeComponents = twentyFourHourTime.split(":");
    let hours = parseInt(timeComponents[0]);
    let minutes = parseInt(timeComponents[1]);
    let ampm = "am";
    if(hours === 0) {
        hours = 12;
    } else if(hours === 12) {
        ampm = "pm";
    } else if(hours > 12) {
        hours = hours - 12;
        ampm = "pm";
    }
    if(minutes < 10) {
        minutes = "0" + minutes;
    }
    return hours + ":" + minutes + ampm;
}