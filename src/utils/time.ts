const getHourStatusText = (hourStatus: string): string => `${hourStatus[0]}.${hourStatus[1]}`;

type GetTimeDetail = (timestamp?: number) => {
  date: string;
  displayTime: string;
  hourStatus: string;
  displayStatus: string;
};

export const getTimeDetail: GetTimeDetail = (timestamp) => {
  const timeObject = timestamp ? new Date(timestamp) : new Date();
  // timeFormat will be like: 12/09, 01:55 PM
  const timeFormat = timeObject.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const [date, time] = timeFormat.split(', ');
  const [displayTime, hourStatus] = time.split(' ');

  return {
    date,
    displayTime,
    hourStatus,
    displayStatus: getHourStatusText(hourStatus),
  };
};
