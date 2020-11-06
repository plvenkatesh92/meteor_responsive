import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/action';

class OrganizationsListItem extends Component {
    state = {
        isClicked: false,
        isEdit: false,
        isAdd: false,
        isRole: false,
    }

    editOrganization = (orgId) => {
        this.setState({ isEdit: true, isAdd: false, isRole: false }); 
        console.log('this.props',this.props.history);
        this.props.history.push(`/organization/${orgId}`);
    }

    addMember = () => {
        this.setState({ isEdit: false, isAdd: true, isRole: false });
        this.props.history.push('/members');
    }
    
    render() {
        const orgObj = this.props.orgObj;
        return (
            <div>
                <div onClick={() => this.setState({ isClicked: !this.state.isClicked })}>
                    <h4 className="update-text pointer"> { orgObj.name } <span className={!this.state.isClicked ? "glyphicon glyphicon-chevron-down down-glyphicon" :"glyphicon glyphicon-chevron-up up-glyphicon"}></span></h4>
                </div>
                <div>
                    {
                    this.state.isClicked ?
                        <div className='dropdown-options'>
                            <p className={this.state.isEdit ? 'active' : 'inactive'}
                            onClick={ () => { this.editOrganization(orgObj._id) }}>Edit Organization</p>
                            <p className={this.state.isAdd ? 'active' : 'inactive'} 
                            onClick={this.addMember}>Add Members</p>
                            <p className={this.state.isRole ? 'active' : 'inactive'}
                            onClick={() => { this.setState({ isEdit: false }); this.setState({ isAdd: false }); this.setState({ isRole: true }); }}>Roles</p>
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNewIdenityClick: (e) => dispatch(actions.addIdentity(e))
    }
  }

 export default connect(
        null,
        mapDispatchToProps
 )(OrganizationsListItem);