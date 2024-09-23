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

export function dateFromSlug(dateSlug) {
    let components = dateSlug.split("-");
    let month = parseInt(components[0]) - 1;
    let day = parseInt(components[1]);
    let year = parseInt(components[2]);
    return new Date(year, month, day);
}

export function getDateText(dateVal) {
    let dayOfWeekText = DAYS_OF_WEEK[dateVal.getDay()];
    let monthText = MONTHS[dateVal.getMonth()];
    return dayOfWeekText + " " + monthText + " " + dateVal.getDate() + dateSuffix(dateVal.getDate()) + ", " + dateVal.getFullYear();
}

export function toTwelveHourTime(twentyFourHourTime, uppercase) {
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
    if(uppercase) {
        ampm = " " + ampm.toUpperCase();
    }
    return hours + ":" + minutes + ampm;
}

export function addMinutesToTime(time, addMinutes) {
    let timeComponents = time.split(":");
    let hours = parseInt(timeComponents[0]);
    let minutes = parseInt(timeComponents[1]);
    
    minutes += hours * 60;
    minutes += addMinutes;

    hours = Math.floor(minutes/60);
    minutes -= Math.floor(minutes/60) * 60;
    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    return hours + ":" + minutes;
}

export function subtractTimeFromTime(subtractFromTime, subtractTime) {
    let subtractFromTimeComponents = subtractFromTime.split(":");
    let subtractFromTimeHours = parseInt(subtractFromTimeComponents[0]);
    let subtractFromTimeMinutes = parseInt(subtractFromTimeComponents[1]);
    subtractFromTimeMinutes += subtractFromTimeHours * 60;

    let subtractTimeComponents = subtractTime.split(":");
    let subtractTimeHours = parseInt(subtractTimeComponents[0]);
    let subtractTimeMinutes = parseInt(subtractTimeComponents[1]);
    subtractTimeMinutes += subtractTimeHours * 60;
    
    return subtractFromTimeMinutes - subtractTimeMinutes;
}

export function getPreviousDate(date) {
    let dateObj = dateFromSlug(date);
    dateObj.setTime(dateObj.getTime() - 24*60*60*1000);
    return getDateSlug(dateObj);
}

export function getNextDate(date) {
    let dateObj = dateFromSlug(date);
    dateObj.setTime(dateObj.getTime() + 24*60*60*1000);
    return getDateSlug(dateObj);
}