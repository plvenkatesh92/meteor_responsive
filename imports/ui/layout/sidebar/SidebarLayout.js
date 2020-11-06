import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollapsedSidebar from './collapsed/CollapsedSidebar';
import ExpandedSidebar from './expanded/ExpandedSidebar';
import './sidebar.css';

class SidebarLayout extends Component {
    render() {
        return (
            <div>
                <div className={this.props.isSidebarOpen ? "col-md-3 dashboard-left-panel expand-transition" : "col-md-1 dashboard-left-panel collapsed-width"}>
                    <div className="leftContent">
                        <div className={this.props.isSidebarOpen ? "col-md-2 no-padding sidebar-menu minwdth60" : "no-padding sidebar-menu"}>
                            <CollapsedSidebar {...this.props}/>
                        </div>
                        {
                            (this.props.isSidebarOpen) ?
                                <div className="col-md-10 no-padding">
                                    <ExpandedSidebar {...this.props} />
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSidebarOpen: state.isSidebarOpen
    }
}

export default connect(mapStateToProps, null)(SidebarLayout);