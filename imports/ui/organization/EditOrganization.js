import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/action';
import OrganizationList from './OrganizationList';

class EditOrganization extends Component {
    state = {
        isClicked: false,
        isEdit: false,
        isAdd: false,
        isRole: false,
        selectedType: ""
    }

    editOrganization = () => {
        this.setState({ isEdit: true, isAdd: false, isRole: false }); 
        console.log('this.props',this.props.history);
        this.props.history.push('/organization');
    }

    addMember = () => {
        this.setState({ selectedType: "member", isEdit: false, isAdd: true, isRole: false });
        this.props.history.push('/dashboard');
    }

    onNewClick = () => {
        if (this.state.selectedType == "" || this.state.selectedType == "organization") {
            this.props.history.push('/organization');
        } else if (this.state.selectedType == "member") {
            this.props.history.push('/dashboard');
        }
    }
    
    render() {
        console.log("newOrganizationAdded ", this.props.newOrganizationAdded)
        return (
            <div>
                <div>
                    <h3 className="update-text"> Organizations</h3>
                    <p className="update-text-italic">Manage your Organizations</p>
                </div>
                <div>
                    <OrganizationList {...this.props} />
                </div>
                {this.state.isClicked ?
                    <div className='dropdown-options'>
                        <p className={this.state.isEdit ? 'active' : 'inactive'}
                           onClick={this.editOrganization}>Edit Organization</p>
                        <p className={this.state.isAdd ? 'active' : 'inactive'} 
                           onClick={this.addMember}>Add Members</p>
                        <p className={this.state.isRole ? 'active' : 'inactive'}
                           onClick={() => { this.setState({ isEdit: false }); this.setState({ isAdd: false }); this.setState({ isRole: true }); }}>Roles</p>
                    </div>
                    : null}
                <button onClick={this.onNewClick} className='new-btn'>+ New</button>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        newOrganizationAdded: state.newOrganizationAdded,
    }
}

 const mapDispatchToProps = dispatch => {
    return {
        onNewIdenityClick: (e) => dispatch(actions.addIdentity(e))
    }
  }

 export default connect(
        mapStateToProps,
        mapDispatchToProps
 )(EditOrganization);