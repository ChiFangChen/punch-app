import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getTimeDetail } from '@/utils/time';
import { types } from '@/model';
import { StyledRecordItem } from './styles';

type ListItemProps = types.Record;

const ListItem = ({ timestamp, action, address }: ListItemProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { date, displayTime, displayStatus } = getTimeDetail({
    timestamp,
    locale: language as types.Language,
  });
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
