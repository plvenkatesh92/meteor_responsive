import React, { Component } from 'react'
import OrganizationForm from './OrganizationForm';
import './organization.css';

export default organizationIndex = (props) => {
        return (
                <div className="row flx-row">
                    <div className='col-md-8'>
                        <OrganizationForm {...props} />
                    </div>
                    <div className='col-md-4'>
                        <div className='organization-right-panel'>
                            <div className='organization-sub-right-panel'>
                            </div>
                        </div>
                    </div>
                </div>
        )
}