import React, {useState,useEffect} from 'react';
import { Content, IconButton, Header, Tabbar, SelectToken } from '@citadeldao/apps-ui-kit/dist/main';
import { Config } from '../../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { panelActions } from '../../store/actions'
import '../../assets/styles/panels/swap.css'
const AddressListPanel = () => {
    const config = new Config()
    const { wallets } = useSelector((state) => state.wallet)
    const { bottomInset } = useSelector(state => state.panels)
    const [value, setValue] = useState(0)
    const [balanceView, setBalanceView] = useState('View Balance')
    const data = [
        {
            network: 'Secret',
            name: 'SECRET',
            net: 'secret',
            code: 'SCRT',
            symbol: 'SCRT',
            balance: 20450.5,
            usdPrice: 450.05,
        },
        {
            network: 'Osmosis',
            code: 'OSMO',
            name: 'OSMOSIS',
            symbol: 'SCRT',
            net: 'osmosis',
            balance: 20450.5,
            usdPrice: 450.05
        },
        {
            network: 'Sifchain',
            code: 'ROWAN',
            name: 'SIFCHAIN',
            symbol: 'SCRT',
            net: 'sifchain',
            balance: 20450.5,
            usdPrice: 450.05
        },
        {
            network: 'Sifchain',
            name: 'SIFCHAIN',
            code: 'ROWAN',
            symbol: 'SCRT',
            net: 'sifchain',
            balance: 20450.5,
            usdPrice: 450.05,
        }
    ]
    const [selectedOption, setSelectedOption] = useState(data[0])
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(panelActions.setPreviousPanel(location.pathname))
        // eslint-disable-next-line
    },[wallets])
    return (
        <div className='panel'>
            <Header config={config}/>
            <Content>
                <div className='swap-inputs'>
                <SelectToken 
                    max={true} 
                    usdPrice='23' 
                    balance={true} 
                    token={true} 
                    action={true}
                    data={data} 
                    style={{marginBottom: '30px'}}
                    field='from'
                    value={value}  setValue={setValue} 
                    selectedOption={selectedOption}  setSelectedOption={setSelectedOption} 
                    balanceView={balanceView} setBalanceView={setBalanceView} 
                    onClick={() => console.log(value)}
                    />
            <IconButton type="hexagon" icon='arrows-towards'  className='swap-center-btn' width={60} height={60} bgColor="#C6D1FF" iconColor="#173296" borderColor="#869FFF"/>
            <SelectToken 
                    max={true} 
                    balance={true} 
                    token={true} 
                    action={true}
                    data={data} 
                    field='to'
                    value={value}  setValue={setValue} 
                    selectedOption={selectedOption}  setSelectedOption={setSelectedOption} 
                    balanceView={balanceView} setBalanceView={setBalanceView} 
                    onClick={() => console.log(value)}
                    />
                </div>
            </Content>
            <Tabbar config={config} bottomInset={bottomInset}/>
        </div>
    )
}

export default AddressListPanel