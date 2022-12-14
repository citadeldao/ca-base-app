import { types } from './types';

const setPreviousPanel = (panel) => dispatch => {
    dispatch({
        type: types.SET_PREVIOUS_PANEL,
        payload: panel,
    });
};

export const panelActions = {
    setPreviousPanel,
};