import React, { Component } from 'react'

export default class ViewAudit extends Component {
    render() {
        console.log('singleData', this.props)
        const {singleData} = this.props
        return (
            <div className='view-panel'>
                <div className='sub-view-panel'>
                    <div className='close-btn' onClick={()=>this.props.onClose(false)}>
                        <p className='close-btn-txt'>x</p>
                    </div>
                    <div className='m-2'>
                        <p className='sub-title'>ID : <span className='sub-title-span'>{singleData._id}</span></p>
                        <p className='sub-title'>Activity Date : <span className='sub-title-span'>{new Date(singleData.activityDate).toDateString()}</span></p>
                        <p className='sub-title'>Activity Type : <span className='sub-title-span'>{singleData.activityType}</span></p>
                        <p className='sub-title'>Activity Identity : <span className='sub-title-span'>{singleData.sourceName}</span></p>
                        <p className='sub-title'>Activity Target : <span className='sub-title-span'>{singleData.targetName}</span></p>
                    </div>                    
                </div>
            </div>
        )
    }
}