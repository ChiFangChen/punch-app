import { memo } from 'react';
import { capitalizeFirstLetter } from '@/utils/text';
import { getTimeDetail } from '@/utils/time';
import { Record } from '@/model/slices/history';
import { StyledRecordItem } from './styles';

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
