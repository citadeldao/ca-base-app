import React, {useState,useRef} from 'react'
// eslint-disable-next-line
import { Tablist, Header, Content, Tab} from '@citadeldao/apps-ui-kit/dist/main'
import GuidesPanel from './GuidesPanel'
const InfoPanel = (props) => {
    // eslint-disable-next-line
    const [active, setActive] = useState('Guides')
    const headerRef = useRef()
    return (
        <section className='info-panel'>
            <div className='panel-header-line' style={{background: props.config.headerParamsFromConfig('TOP_BACKGROUND_COLOR') }}></div>
            <Header refs={headerRef}/>
            <Content>
                <GuidesPanel/>
                {/* <Tablist active={active} setActive={setActive} type="button">
                    <Tab label='Guides'><GuidesPanel/></Tab>
                    <Tab label='Assets'>Content of Assets</Tab>
                    <Tab label='Charts'>Content of Charts</Tab>
                </Tablist>  */}
            </Content> 
        </section>
    )
}

export default InfoPanel