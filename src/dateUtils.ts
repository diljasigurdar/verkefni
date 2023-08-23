import {addDays, eachDayOfInterval, format, startOfDay, addMinutes} from 'date-fns';

export const formatDate = (date: Date) => {
    return format(date, 'iii d. MMMM');
};

export const constructIntervalDates = () => {
    const today = startOfDay(new Date());

    const yesterday = addDays(today, -1);
    const futureDate = addDays(today, 6);

    return eachDayOfInterval({start: yesterday, end: futureDate});
};

export const toAnsiString = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
};

export const formatTime = (date: Date) => {
    return format(date, 'HH:mm');
};

export const getEndTime = (date: Date, duration: number) => {
    return format(addMinutes(date, duration), 'HH:mm');
};
