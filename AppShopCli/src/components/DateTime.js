import moment from 'moment';

const getDateString = targetDate => {
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'days').startOf('day');
  const tomorrow = moment().add(1, 'days').startOf('day');

  if (targetDate.isSame(today, 'day')) {
    return 'Hôm nay';
  } else if (targetDate.isSame(yesterday, 'day')) {
    return 'Hôm qua';
  } else if (targetDate.isSame(tomorrow, 'day')) {
    return 'Ngày mai';
  } else {
    return targetDate.format('DD/MM/YYYY');
  }
};

const getTimeString = targetDate => {
  return targetDate.format('HH:mm');
};

export const formatNotificationTime = time => {
  const targetDate = moment(time);

  return `${getDateString(targetDate)} ${getTimeString(targetDate)}`;
};

export const formatMessageTime = time => {
  const targetDate = moment(time);
  const now = moment();
  const isToday = targetDate.isSameOrAfter(now.startOf('day'));

  return isToday ? getTimeString(targetDate) : targetDate.format('DD/MM');
};
