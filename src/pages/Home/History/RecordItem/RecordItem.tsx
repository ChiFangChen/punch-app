import { memo } from 'react';
import { capitalizeFirstLetter } from '@/utils/text';
import { getTimeDetail } from '@/utils/time';
import { StyledRecordItem } from './styles';

interface Record {
  timestamp: number;
  action: 'clock in' | 'clock out';
  address: string;
}

type RecordProps = Record;

const RecordItem = ({ timestamp, action, address }: RecordProps) => {
  const { date, displayTime, displayStatus } = getTimeDetail(timestamp);
  return (
    <StyledRecordItem>
      <div>
        {date} @ {displayTime} {displayStatus} <span>{capitalizeFirstLetter(action)}</span>
      </div>
      <div>{address}</div>
    </StyledRecordItem>
  );
};

export default memo(RecordItem);
