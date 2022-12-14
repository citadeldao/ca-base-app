import { HashRouter, Routes, Route } from 'react-router-dom';
import MainView from './MainView';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { walletActions } from './store/actions';
import { useEffect } from 'react';
import { SocketManager } from './networking/socket';


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(walletActions.loadWalletWithBalances());
        SocketManager.connect();
        // eslint-disable-next-line
    }, []);
    return (
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path="/*" element={<MainView/>}/>
                </Routes>
            </HashRouter>
        </Provider>
    );
}

export default App;
