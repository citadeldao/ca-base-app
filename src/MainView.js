import React, { useState, useEffect } from 'react';
import './assets/styles/panels/index.css';
import GuidesPanel from './components/panels/GuidesPanel';
import ROUTES from './routes';
import AddressListPanel from './components/panels/AddressListPanel';
import TransactionsPanel from './components/panels/TransactionsPanel';
import TransactionsDetailsPanel from './components/panels/TransactionDetails';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { errorActions } from './store/actions';
import text from './text.json';
import { useNavigate } from 'react-router-dom';
import {
    StatusPopup,
    PopupWindow,
    TipCard,
    NotificationCard,
    Panel,
    Modal,
    View,
    AddressSectionCard,
} from '@citadeldao/apps-ui-kit/dist/main';
import InfoPanel from './components/panels/InfoPanel';
import { Config } from './config/config';
import SelectAddressPanel from './components/panels/SelectAddressPanel';
import { prettyNumber } from './helpers/numberFormatter';
const MainView = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.errors.openErrorModal);
    const { validationErrors, errors } = useSelector(state => state.errors);
    const { borderRadius } = useSelector(state => state.panels)
    const { activeWallet } = useSelector(state => state.wallet);
    const [showSuccess, setShowSuccess] = useState(errors);
    useEffect(() => {
        setShowSuccess(errors);
        console.log(window.location.pathname);
        if (window.location.pathname.includes('/info/')) {
            navigate(window.location.pathname);
        }
        // eslint-disable-next-line 
    }, [errors]);
    const clearErrors = () => {
        setShowSuccess(false);
        dispatch(errorActions.clearErrors());
    };
    const navigate = useNavigate();
    let wallet = activeWallet;

    if (activeWallet) {
      wallet = {...activeWallet,balance: prettyNumber(activeWallet?.balance)}
    }
    const config = new Config()
    
    return(
        <View>
            <Panel config={config} style={{borderRadius: `${borderRadius}px`}}>
                <AddressSectionCard onClick={() => navigate(ROUTES.SELECT_ADDRESS)}
                                    className='select-address-card' data={wallet}
                                    id="/show"></AddressSectionCard>
                <PopupWindow show={showSuccess} id="/show">
                    <StatusPopup text={errors?.text} type="error" showPopup={clearErrors}/>
                </PopupWindow>
                <AddressListPanel id={ROUTES.ADDRESS_LIST}/>
                <TransactionsPanel id={ROUTES.TRANSACTIONS}/>
                <GuidesPanel id={ROUTES.INFO_MENU_GUIDE}/>
                <SelectAddressPanel id={ROUTES.SELECT_ADDRESS}/>
                <TransactionsDetailsPanel id={ROUTES.TRANSACTION_DETAILS}/>
                <Modal id={ROUTES.ADDRESS_LIST} show={showModal && !location.pathname.includes('/info')}>
                    {validationErrors?.text && <div>
                        <NotificationCard text={text.ADDRESS_ERROR_HEADER} iconColor="#00B2FE"
                                        boldText/>
                        <p className="description-text">{text.ADDRESS_ERROR_DESCRIPTION}</p>
                        <TipCard text={text.ADDRESS_ERROR_TIP}/>
                    </div>}
                </Modal>
            </Panel>
            <InfoPanel config={config}/>
           
        </View>
    );
};

export default MainView;