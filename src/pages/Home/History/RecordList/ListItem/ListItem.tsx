import { memo } from 'react';
import { getTimeDetail } from '@/utils/time';
import { Record } from '@/model/slices/history';
import { StyledRecordItem } from './styles';

type ListItemProps = Record;

const ListItem = ({ timestamp, action, address }: ListItemProps) => {
  const { date, displayTime, displayStatus } = getTimeDetail(timestamp);
  return (
    <StyledRecordItem>
      <div>
        {date} @ {displayTime} {displayStatus} <span>Clock {action}</span>
      </div>
      <div>{address}</div>
    </StyledRecordItem>
  );
};

export default memo(ListItem);
