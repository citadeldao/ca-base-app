import React from 'react'
import { GuidesCard } from '@citadeldao/apps-ui-kit/dist/main'
import text from '../../text.json'
import '../../assets/styles/uiKit/guides.css'
import { ReactComponent as Guide1 } from '../../assets/img/guides/guide1.svg'
import { ReactComponent as Guide2 } from '../../assets/img/guides/guide2.svg'
import { ReactComponent as Guide3 } from '../../assets/img/guides/guide3.svg'
import { ReactComponent as Guide4 } from '../../assets/img/guides/guide4.svg'
import { ReactComponent as Guide5 } from '../../assets/img/guides/guide5.svg'
const GuidesPanel = () => {
    return (
        <div className='guides-panel'>
            <div>
                <h3 className='heading-text-h3'>Guides & Questions</h3>
                <p className='description-text'>Learn more about autorestaking</p>
            </div>
            <GuidesCard text={text.GUIDES_HEADER_1}>
                <p>{text.GUIDES_DESCRIPTION_1}</p>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_2}>
                <div className='row guide-content-1'>
                    <p>{text.GUIDES_DESCRIPTION_2}</p>
                    <Guide1 className='quide-img'/>
                </div>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_3}>
                <div className='row guide-content-2'>
                    <p>{text.GUIDES_DESCRIPTION_3}</p>
                    <Guide2 className='quide-img' />
                </div>
                <div className='row guide-content-2'>
                    <p>{text.GUIDES_DESCRIPTION_3_2}</p>
                    <Guide3 className='quide-img' />
                </div>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_4}>
                <div className='row guide-content-3'>
                    <p>{text.GUIDES_DESCRIPTION_4}</p>
                    <Guide4 className='quide-img' />
                </div>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_5}>
                <div className='row guide-content-4'>
                    <p>{text.GUIDES_DESCRIPTION_5}</p>
                    <Guide5 className='quide-img' />
                </div>
            </GuidesCard>
        </div>
    )
}

export default GuidesPanel