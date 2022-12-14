import { combineReducers } from 'redux';
import TransactionsReducer from './transactionsReducer';
import UserReducer from './userReducer';
import ErrorReducer from './errorsReducer';
import WalletReducer from './walletReducer';
import PanelReducer from './panelReducer';

export const state = combineReducers({
    transaction: TransactionsReducer,
    user: UserReducer,
    errors: ErrorReducer,
    wallet: WalletReducer,
    panels: PanelReducer,
});