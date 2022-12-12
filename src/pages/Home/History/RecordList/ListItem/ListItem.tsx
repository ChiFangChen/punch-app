import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getTimeDetail } from '@/utils/time';
import { Record } from '@/model/types';
import { StyledRecordItem } from './styles';

type ListItemProps = Record;

const ListItem = ({ timestamp, action, address }: ListItemProps) => {
  const { t } = useTranslation();
  const { date, displayTime, displayStatus } = getTimeDetail(timestamp);
  return (
    <StyledRecordItem>
      <div>
        {date} @ {displayTime} {displayStatus} <span>{t(`clock-${action}`)}</span>
      </div>
      <div>{address}</div>
    </StyledRecordItem>
  );
};

export default memo(ListItem);
