import { types } from './types';
import { WalletList } from '../../networking/models/WalletList';
import { ValidationError } from '../../networking/models/Errors';
import { errorActions, usersActions } from './index';
import { getRequest } from '../../networking/requests/getRequest';
import { store } from '../store';
import models from '../../networking/models';
import Wallet from '../../networking/models/Wallet';
import { utils } from '@citadeldao/apps-sdk';

const getWalletConstructor = (address) => {
    try {
        const { activeWallet } = store.getState().wallet;
        const currentWallet = address || activeWallet;
        const WalletConstructor = models[currentWallet.network.toUpperCase()];

        if (WalletConstructor) {
            return new WalletConstructor(currentWallet);
        }

        return new Wallet(currentWallet);
    } catch {
        new Error('Wallet doesn\'t exists ');
    }
};

const loadWalletWithBalances = () => async (dispatch) => {
    const walletList = new WalletList();
    walletList.loadWalletsWithBalances().then(wallets => {
        if (wallets instanceof ValidationError) {
            dispatch(errorActions.checkErrors(wallets));
            stopSplashLoader();
            return;
        }
        dispatch({
            type: types.SET_WALLETS,
            payload: wallets,
        });
        usersActions.loadUserConfig().then(user_configs => {
            let flag = false;
            const { address, network } = user_configs?.lastWalletInfo

            wallets?.forEach((item) => {
                const hasInLastWalletInfo = item.address.toLowerCase() === address.toLowerCase()
                    && item.network === network;

                if (hasInLastWalletInfo) {
                    flag = true;
                    setTimeout(() => {
                        dispatch({
                            type: types.SET_ACTIVE_WALLET,
                            payload: item,
                        });
                    }, 1000);
                }    
            });
            if (!flag) {
                dispatch(setActiveWallet(wallets[0]));
            }
            setTimeout(() => {
                stopSplashLoader();
            }, 1000);
        }).catch(() => {
            dispatch(setActiveWallet(wallets[0]));
            setTimeout(() => {
                stopSplashLoader();
            }, 1000);
        });
    });
};

const loadNetworks = () => async (dispatch) => {
    try {
        const restakeRequest = getRequest('restake').getNetworks();
        const rm = new utils.RequestManager();
        const result = await rm.send(restakeRequest);
        const walletRequest = getRequest('wallet').getStakeNodes();
        const nodes = await rm.send(walletRequest);
        dispatch({
            type: types.SET_NETWORKS,
            payload: result.data,
        });
        dispatch({
            type: types.SET_STAKE_NODES,
            payload: nodes.data,
        });
    } catch {
    }
};

const preparePermissionTransfer = async (address, status, minAmount) => {
    const wallet = getWalletConstructor(address);
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let expiryDate = new Date(year + 2, month, day);
    let data = {
        status, expiryDate: expiryDate.toISOString(),
    };
    if (+minAmount > 0) {
        data.minAmount = +minAmount;
    }
    const transaction = await wallet.setPermissionRestake(data);
    wallet.prepareTransfer(transaction.data).then((res) => {
        if (res.ok) {
            return store.dispatch({
                type: types.SET_PREPARE_TRANSFER_RESPONSE,
                payload: { transaction: transaction.data, wallet },
            });
        } else {
            store.dispatch(errorActions.checkErrors(res.data));
        }
    }).catch((err) => {
        store.dispatch(errorActions.checkErrors(err));
    });
};

const stopSplashLoader = () => {
    setTimeout(() => {
        document.getElementById('root').style.display = 'block';
        document.getElementById('splash').style.display = 'none';
    }, 3000);
};

const setActiveWallet = (wallet) => (dispatch) => {
    dispatch({
        type: types.SET_ACTIVE_WALLET,
        payload: wallet,
    });
    const config = {
        lastWalletInfo: {
            address: wallet.address,
            network: wallet.network,
        },
    };
    usersActions.setUserConfig(config);
};


const updateWalletList = async(wallet) => {
    let { wallets, activeWallet, networks } = store.getState().wallet
    let metaMaskWallet = wallets && wallets.find(elem => elem.from === 'metamask')
    if(metaMaskWallet){
        let updateActiveWallet = false
        if(metaMaskWallet.network === wallet.net && wallet.address){
            if(metaMaskWallet.address === activeWallet.address){
                updateActiveWallet = true
            }
            metaMaskWallet.address = wallet.address
            const walletInstance = getWalletConstructor(metaMaskWallet)
            const response = await walletInstance.getWalletBalance()
            metaMaskWallet.balance = response.data.mainBalance
            if(updateActiveWallet){
                store.dispatch(setActiveWallet(metaMaskWallet))
            }
        }else{
            wallets = wallets.filter(elem => elem.from !== 'metamask')
            if(wallets.length === 0){
                store.dispatch(setActiveWallet(null))
                store.dispatch(errorActions.checkErrors(new ValidationError())) 
            }
        }
    }else{
        const walletList = new WalletList()
        wallet.network = wallet.net
        wallet.name = networks[wallet?.net]?.name
        wallet.code = networks[wallet?.net]?.code
        wallet.decimals = networks[wallet?.net]?.decimals
        wallet.from = 'metamask'
        wallet.getTxUrl = walletList.getTxUrl(wallet?.net)
        const walletInstance = getWalletConstructor(wallet)
        const response = await walletInstance.getWalletBalance()
        wallet.balance = response.data.mainBalance
        wallets = wallets.concat([wallet])
        if(!activeWallet){
            store.dispatch(setActiveWallet(wallet))
        }
        store.dispatch(errorActions.clearErrors())
    }
    store.dispatch({
        type: types.SET_WALLETS,
        payload: wallets
    })
}

export const walletActions = {
    getWalletConstructor,
    loadWalletWithBalances,
    loadNetworks,
    preparePermissionTransfer,
    stopSplashLoader,
    updateWalletList,
    setActiveWallet,
};
