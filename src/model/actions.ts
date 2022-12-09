import { actions as configActions } from './slices/config';
import { actions as historyActions } from './slices/history';

const actions = { ...configActions, ...historyActions };

export default actions;
