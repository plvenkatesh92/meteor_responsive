import React, { Component } from "react";
import Toaster, * as toast from '../shared/toaster';
import { connect } from 'react-redux';
import * as actions from '../store/actions/action';

class OrganizationForm extends Component {
  constructor(props){
    super(props)
    this.state = this.getInitialState();
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
        const orgId = this.props.match.params.id;
        Meteor.call('organization.getById', orgId,
          (error, result) => {
              if (!error) {
               const orgObj = result[0];
               if (orgObj && location) {
                  const location = (orgObj.locations && orgObj.locations.length > 0) ? orgObj.locations[0] : null;
                  console.log(orgObj, location);       
                  this.setState({
                      nickName : orgObj.nickName,
                      country : location.country,
                      state : location.state,
                      city : location.city,
                      zipCode : location.zipCode,
                      village : location.village,
                      addressLineOne : location.addressLineOne,
                      addressLineTwo : location.addressLineTwo,
                      apartmentNumber : location.apartmentNumber,
                      labelAddress : location.labelAddress
                    });
                } else if (orgObj) {
                  this.setState({
                    nickName : orgObj.nickName
                  });
                } else if (!this.props.isEdit) {
                  this.setState(this.getInitialState());
                }
            }
        });
    }
  }

  getInitialState = () => {
    return {
      nickName : "",
      country : "",
      state : "",
      city : "",
      zipCode : "",
      village : "",
      addressLineOne : "",
      addressLineTwo : "",
      apartmentNumber : "",
      labelAddress : "",
      currentActiveRef : "",
      errMsg : null,
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
      const postObj = {
        name : "Inner Apps LLC",
        nickName : this.state.nickName,
        country : this.state.country,
        state : this.state.state,
        city : this.state.city,
        zipCode : this.state.zipCode,
        village : this.state.village,
        addressLineOne : this.state.addressLineOne,
        addressLineTwo : this.state.addressLineTwo,
        apartmentNumber : this.state.apartmentNumber,
        labelAddress : this.state.labelAddress,
        // currentActiveRef : this.state.currentActiveRef
      }

      if (!this.props.isEdit) {
        Meteor.call('organization.insert', postObj,
        (error, result) => {
            if (!error) {
              this.insertOrUpdate(error, result);
              Meteor.call('activity.insert', {
                  activityType: 'Organization created',
                  activityTarget: result,
              });
          }
        });
      } else {
        Meteor.call('organization.update', postObj,
        (error, result) => {
            if (!error) {
              this.insertOrUpdate(error, result);
              Meteor.call('activity.insert', {
                  activityType: 'Organization updated',
                  activityTarget: result,
              });
          }
        });
      }       
  }

  insertOrUpdate = (error, result) => {
    if (error) {
        console.log(" Failed to insert employee " + error);
        this.setState({ errMsg: "Something Went Wrong" });
        toast.showToaster(this.state.errMsg,toast.failure)
    }
    else {
        const msg = `Organization ${(this.props.isEdit) ? "updated" : "created"} successfully`;
        toast.showToaster(msg,toast.success);
    }
  }

  render() {
    return (
        <div className="bg">
          <div>
            {
              (this.props.isEdit) ? 
                <h5 className="title"><T _tagType='span'>organization.editOrganization</T></h5>
                :
                <h5 className="title">Add Organization</h5>
            }
          </div>
          <div className="form-header-card">
              <p className="form-title"><T _tagType='span'>organization.innerAppsLLC</T></p>
          </div>
          <div className='divider'/>
          <div className="form-body-card-header">
            <div className="status-view">
                <div className='visible'>
              <p><span className="glyphicon glyphicon-eye-open eye-glyphicon"></span><T _tagType='span'>organization.visible</T></p>
              </div>
              <div className='visible'>
              <p>|</p>
              </div>
              <div className='inner-title visible'>
              <p><T _tagType='span'>organization.currentStatus</T> - Unverified</p>
              </div>
            </div>
          </div>
          
          <div className="form-body-card-body">           
              <div className='form'>
              <div>
                <span className="glyphicon glyphicon-option-vertical menu-glyphicon"/>
              </div>
              <div className='input-div'>
              <label className='label-text'><T _tagType='span'>organization.nickname</T></label>
              <input type="text" name="nickName" value={this.state.nickName} onChange={this.onChange} className="form-control"/>
              </div>
              <div className='input-div'>
              <label className='label-text'><T _tagType='span'>organization.country</T></label>
              <input type="text" name="country" value={this.state.country} onChange={this.onChange} className="form-control"/>
              </div>
              <div className='input-div'>
              <label className='label-text'><T _tagType='span'>organization.state</T></label>
              <input type="text" name="state" value={this.state.state} onChange={this.onChange} className="form-control"/>
              </div>
                <div className='two-inputs'>
                <div className='grid'>
                <div className='sub-input-div'>
                   <label className='label-text'><T _tagType='span'>organization.city</T></label>
                   <input type="text" name="city" value={this.state.city} onChange={this.onChange} className="form-control"/>
                </div>
                </div>
                <div className='grid'>
                <div className='sub-input-div'>
                   <label className='label-text'><T _tagType='span'>organization.zipCode</T></label>
                   <input type="text" name="zipCode" value={this.state.zipCode} onChange={this.onChange} className="form-control"/>
                </div>
                </div>
                </div>

              <div className='input-div'>
              <label className='label-text'><T _tagType='span'>organization.village</T></label>
              <input type="text" name="village" value={this.state.village} onChange={this.onChange} className="form-control"/>
              </div>
              <div className='input-div'>
              <label className='label-text'><T _tagType='span'>organization.addressLine</T> 1</label>
              <input type="text" name="addressLineOne" value={this.state.addressLineOne} onChange={this.onChange} className="form-control"/>
              </div>
              <div className='input-div'>
              <label className='label-text'><T _tagType='span'>organization.addressLine</T> 2</label>
              <input type="text" name="addressLineTwo" value={this.state.addressLineTwo} onChange={this.onChange} className="form-control"/>
              </div>
              <div className='input-div'>
              <label className='label-text'><T _tagType='span'>organization.apartment</T></label>
              <input type="text" name="apartmentNumber" value={this.state.apartmentNumber} onChange={this.onChange} className="form-control"/>
              </div>
              <div className='input-div'>
                  <label className='label-text'><T _tagType='span'>organization.labelAddress</T></label>
                  <input type="text" name="labelAddress" value={this.state.labelAddress} onChange={this.onChange} className="form-control"/>
              </div>
              
              <div>
              {/* <div className='two-inputs'>
                <div className='grid'>
                  <div className='sub-input-div'>
                   <label className='label-text'><T _tagType='span'>organization.labelAddress</T></label>
                   <input type="text" name="labelAddress" value={this.state.labelAddress} onChange={this.onChange} className="form-control"/>
                </div>
                </div>
                <div className='grid'>
                <div className='sub-input-div'>
                  <label className='label-text'><T _tagType='span'>organization.currentActiveResidence</T></label>
                   <input type="text" name="currentActiveRef" value={this.state.currentActiveRef} onChange={this.onChange} className="form-control"/>
                </div>
                </div>
              </div> */}
              </div>

                <div className='btn-group'>
                    <div className='btn-view'>
                    <button className='organization-update-btn' onClick={this.onSubmit}>
                    {
                      (this.props.isEdit) ? "Update" : "Create"
                    }
                    </button>
                    </div>
                    <div className='btn-view'>
                    <button className='cancel-btn'>Cancel</button>
                    </div>
                </div>
              </div>
              <div className='form-two'>
                <div className='sub-form'>
                    {/* For future update */}
                </div>
              </div>
              </div>
              <Toaster/>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
     // newOrganizationAdded: state.newOrganizationAdded,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addNewOrganization: (e) => dispatch(actions.addNewOrganization("add"))
  }
}

export default connect(
      mapStateToProps,
      mapDispatchToProps
)(OrganizationForm);