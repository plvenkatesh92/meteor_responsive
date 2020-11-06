import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarCloseButton from '../collapsed/SidebarCloseButton';
import EmployeeForm from './EmployeeForm';
import EditOrganization from '../../../organization/EditOrganization';

class ExpandedSidebar extends Component {
    componentDidUpdate(prevProps, prevState) {
        console.log("ExpandedSidebar", prevProps, prevState)
        if (this.props.identityType) {
                if (prevProps.identityType !== this.props.identityType) {
                    if (this.props.identityType == "member") {
                        this.props.history.push('/members');
                    } else if (this.props.identityType == "organization") {
                        this.props.history.push('/organization');
                    }
                }
        }
    }


    render() {
        const expandedForm = () => {
            switch (this.props.selectedMenu) {
              case "home": return null;
              case "user": return <EmployeeForm />;
              case "plus": return <EmployeeForm />;
              case "organization": return <EditOrganization {...this.props} />;
              case "relationships": return null;
              default: return null;
            }
        }
        return (
            <div>
                <SidebarCloseButton /> <br />
                <div>{ expandedForm() }</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        identityType: state.identityType,
        selectedMenu: state.selectedMenu
    }
}

export default connect(mapStateToProps, null)(ExpandedSidebar);
