import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector, actions } from '@/model';
import { StyledClockButton } from './styles';

const ClockButton = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const dispatch = useAppDispatch();
  const { history, enabled } = useAppSelector((state) => ({
    history: state.history.data,
    enabled: state.config.data.user.gps && state.config.data.user.inDistance,
  }));
  const nextAction = useMemo(() => (history[0]?.action === 'in' ? 'out' : 'in'), [history]);
  const text = useMemo(() => {
    if (!enabled) return t('disabled');
    return t(`clock-${nextAction}`);
  }, [enabled, nextAction, language]);

  const onPunch = useCallback(() => {
    dispatch(
      actions.appendHistoryAsync({
        action: nextAction,
        timestamp: Date.now(),
      })
    );
  }, [dispatch, nextAction]);

  return (
    <StyledClockButton buttonStatus={nextAction} onClick={onPunch} disabled={!enabled}>
      {text}
    </StyledClockButton>
  );
};

export default ClockButton;
