import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector, actions } from '@/model';
import { StyledClockButton } from './styles';

enum ClockButtonText {
  'disabled' = 'Out of range',
  'enabled' = 'Clock ',
}

const ClockButton = () => {
  const dispatch = useAppDispatch();
  const { history, enabled } = useAppSelector((state) => ({
    history: state.history.data,
    enabled: state.config.data.user.gps && state.config.data.user.inDistance,
  }));
  const nextAction = useMemo(() => (history[0]?.action === 'in' ? 'out' : 'in'), [history]);
  const text = useMemo(() => {
    if (!enabled) return ClockButtonText.disabled;
    return ClockButtonText.enabled + nextAction;
  }, [enabled, nextAction]);

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
