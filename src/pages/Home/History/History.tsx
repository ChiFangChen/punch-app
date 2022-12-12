import { useTranslation } from 'react-i18next';
import RecordList from './RecordList';
import { StyledHistory } from './styles';

const History = () => {
  const { t } = useTranslation();
  return (
    <StyledHistory>
      <h3>{t('history')}</h3>

      <RecordList />
    </StyledHistory>
  );
};

export default History;
