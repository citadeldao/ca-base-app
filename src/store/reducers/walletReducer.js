import { types } from '../actions/types';

const initialState = {
    wallets: null,
    networks: [],
    stakeNodes: null,
    transactionResponse: null,
    loader: true,
    activeWallet: null,
    showSplash: true,
};

export default function WalletReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_WALLETS:
            return {
                ...state,
                wallets: action.payload,
            };
        case types.SET_SPLASH_MODE:
            return {
                ...state,
                showSplash: action.payload,
            };
        case types.SET_ACTIVE_WALLET:
            return {
                ...state,
                activeWallet: action.payload,
            };
        case types.SET_LOADER:
            return {
                ...state,
                loader: action.payload,
            };
        case types.SET_PREPARE_TRANSFER_RESPONSE:
            return {
                ...state,
                transactionResponse: action.payload,
            };
        case types.SET_NETWORKS:
            return {
                ...state,
                networks: action.payload,
            };
        case types.SET_STAKE_NODES:
            return {
                ...state,
                stakeNodes: action.payload,
            };
        default:
            return state;
    }
}