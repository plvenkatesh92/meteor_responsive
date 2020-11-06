import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/action';
import './employee-form.css';

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
      return {
        employeeId: null,
        firstName: "",
        lastName: "",
        dob: "",
        departmentId: "",
        department: "",
        fileObj: null,
        profilePicBase64: null,
        isSubmitted: false,
        errMsg: null
      }
   }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault(); // will prevent the form from reloading
    }


    
    render() {
        const isNew = this.props.employeeId == null ? true : false;
        console.log("Employee Form employeeId", this.props.employeeId, isNew)

        return (   
                <div>
                    <div>
                        <h3 className="update-text"> Create Employee </h3>
                        <p className="update-text-italic">Create member information</p>
                    </div>

                    <div className="employee-text-field">
                        <label> First Name </label>                           
                        <input type="text" name="firstName" className="form-control" value={this.state.firstName} onChange={this.onChange}   />
                    </div>

                    <div className="employee-text-field">
                    <label> Last Name </label>                           
                        <input type="text" name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange} />
                    </div>

                    <div className="employee-text-field">
                        <button type="button" className="btn btn-default submit-button" onClick={this.onSubmit}>
                        Create                                
                        </button>
                        <button type="button" className="btn btn-default cancel-button" onClick={() => { this.props.onNewEmployeeClicked() }} aria-label="Left Align">
                        Cancel                             
                        </button>
                    </div>
                </div>   
        )
    }
}

  const mapStateToProps = (state, props) => {
    return {
        employeeId: state.employeeId,
        employee: state.employee,
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        onNewEmployeeClicked: () => dispatch(actions.addNewEmployee())
    }
  }

 export default connect(
        mapStateToProps,
        mapDispatchToProps
 )(EmployeeForm);