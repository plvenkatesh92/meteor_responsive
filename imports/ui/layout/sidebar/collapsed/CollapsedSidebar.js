import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/action';

const Sidebar = (props) => {   
    const highlightMenu = props.isSidebarOpen ? "expanded-menu-selected" : "collapsed-menu-selected";
    return (
            <div className="sidebar-menu-one">
                <div className={props.selectedMenu == "home" ? highlightMenu : null}>
                    <div className="menu-icon" onClick={ () => {
                        props.onMenuSelectionChange({menu: "home", isSidebarOpen: false});
                        props.history.push('/dashboard');
                       }}>
                        <i className="fa fa-home"></i>
                    </div>
                </div>
                <div className={props.selectedMenu == "user" ? highlightMenu : null}>
                    <div className="menu-icon" onClick={ () => props.onMenuSelectionChange({menu: "user", isSidebarOpen: false}) }>
                        <i className="fa fa-user"></i>
                    </div>
                </div>
                {/* <div className={props.selectedMenu == "plus" ? highlightMenu : null}>
                    <div className="menu-icon" onClick={ () => props.onNewEmployeeClicked({menu: "plus", isSidebarOpen: true}) }>
                        <i className="fa fa-plus"></i>
                    </div>
                </div>
                <div className={props.selectedMenu == "download" ? highlightMenu : null}>
                    <div className="menu-icon" onClick={ () => props.onMenuSelectionChange({menu: "download", isSidebarOpen: false}) }>
                        <i className="fa fa-download"></i>
                    </div>
                </div> */}
                <div className={props.selectedMenu == "relationships" ? highlightMenu : null}>
                    <div className="menu-icon" onClick={ () => props.onMenuSelectionChange({menu: "relationships", isSidebarOpen: false}) }>
                        <i className="fa fa-chart-network"></i>
                    </div>
                </div>
                <div className={props.selectedMenu == "organization" ? highlightMenu : null}>
                    <div className="menu-icon" onClick={ () => props.onMenuSelectionChange({menu: "organization", isSidebarOpen: true}) }>
                        <i className="fa fa-building"></i>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedMenu: state.selectedMenu,
        isSidebarOpen: state.isSidebarOpen
    };
}; 

const mapDispatchToProps = dispatch => {
    return {
        onNewEmployeeClicked: () =>  dispatch(actions.addNewEmployee()),
        onMenuSelectionChange: (obj) =>  {
            dispatch(actions.onMenuSelectionChange(obj));
            // if (e == "home") {
            //     dispatch(actions.collapseSideBar());
            // } else {
            //     dispatch(actions.onMenuSelectionChange(obj));
            // }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);