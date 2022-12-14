import React, { useState } from 'react';
import { Content, Header, Tabbar, Input } from '@citadeldao/apps-ui-kit/dist/main';
import AddressBlock from '@citadeldao/apps-ui-kit/dist/components/uiKit/AddressBlock'
import { Config } from '../../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { walletActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { prettyNumber } from '../../helpers/numberFormatter';
const SelectAddressPanel = () => {
    const config = new Config()
    const { wallets, activeWallet } = useSelector((state) => state.wallet)
    const [walletList, setWalletList] = useState(wallets)
    const previousPanel = useSelector(state => state.panels.previousPanel)
    const dispatch = useDispatch()  
    const { bottomInset } = useSelector(state => state.panels)
    const navigate = useNavigate()
    const back = () => navigate(previousPanel)
    const searchWallet = (wallet) => {
        let arr = wallets.filter(
          (item) =>
          item.code.toLowerCase().includes(wallet.toLowerCase()) ||
          item.name.toLowerCase().includes(wallet.toLowerCase()) ||
          item.address.toLowerCase().includes(wallet.toLowerCase())
        );
        setWalletList(arr);
        if (wallet.length < 1) setWalletList(wallets);
      };
    const setActiveWallet = (wallet) => {
      dispatch(walletActions.setActiveWallet(wallet))
      back();
    }
    return (
        <div className='panel'>
            <Content>
                <Header border title="Select an address" style={{margin: '8px 0 16px 0'}} onClick={() => back()} back={true}/>
                <Input type="search" style={{marginBottom: '10px'}} onChange={searchWallet} placeholder='Start typing..'/>
                {walletList?.map((elem,i) =>(
                  <AddressBlock onClick={() => setActiveWallet(elem)} active={activeWallet?.address === elem?.address} style={{marginBottom: '10px'}} data={{...elem, balance: prettyNumber(elem?.balance)}} key={i}/>  
                ))}
            </Content>
            <Tabbar config={config}  bottomInset={bottomInset}/>
        </div>
    )
}

export default SelectAddressPanel