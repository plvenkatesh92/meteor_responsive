import React, { Component } from "react";
import ViewAudit from "./ViewAudit";
import { withTracker } from 'meteor/react-meteor-data';
import { CSVLink } from "react-csv";
import { Departments } from "../../api/departments";

class ListAudit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      isMore: false,
      singleObj: {},
      isSortingClicked: false,
      activityList: [],
      exportCsv: 0
    }
  }

  onClose = (param) => {
    this.setState({isOpen: param})
  }


  render() {
        // console.log("this.props.activities", this.props.activities);
       //  console.log("this.state.activityList ", this.state.activityList);
       // const activitiesArr = this.props.activities;
        const activitiesArr = this.state.activityList;
        const headers = [
            { label: "Id", key: "_id" },
            { label: "Activity Date", key: "activityDate" },
            { label: "Activity Type", key: "activityType" },
            { label: "Activity Identity", key: "activityIdentity" },
            { label: "Activity Target", key: "activityTarget" },
        ];

        const data =  (activitiesArr && activitiesArr.length > 0) ? 
        (activitiesArr.map((activity, i) =>
            <tr key={i} className='pointer' onClick={() => { this.setState({ isOpen: true }); this.setState({ singleObj: activity }) }}>
              <td>{new Date(activity.activityDate).toDateString()}</td>
              <td>{activity.activityType}</td>
              {/* <td>{activity.activityIdentity}</td>
              <td>{activity.activityTarget}</td> */}
              <td>{activity.sourceName}</td>
              <td>{activity.targetName}</td>
            </tr>
        )) : null;

    return (
      <div className="bg">
         <div className={ `${this.state.isMore ? 'col-md-2 export-div' : 'col-md-2 export-div-inactive'}`}>
         {this.state.isMore &&
           <div>
         <CSVLink data={activitiesArr} headers={headers} filename="Audit-report.csv">
             <button onClick={this.auditFunc} className="export-btn">Export CSV</button>
         </CSVLink>
         </div>
          }
         <div>
         <i onClick={()=>this.setState({isMore: !this.state.isMore})} className="fa fa-ellipsis-v" style={{color:this.state.isMore ? '#fff' : '#000'}}></i>
     </div>
     </div>
        <div className={this.state.isOpen ? "col-md-8 list-body-card-body" : "col-md-12 list-body-card-body"}>
          <div className='list'> 
          <div className='table-height'>           
            <table className="table table-striped">
              <thead className='table-head'>
                <tr>
                  <th style={{border:'none'}} className='table-date' onClick={() => { this.props.sortByColumnName("activityDate"); this.setState({isSortingClicked: !this.state.isSortingClicked}) }}>
                   <p className='table-title'>Activity date </p><i className={this.state.isSortingClicked ? "fas fa-sort-down table-down-icon" : "fas fa-sort-up table-up-icon"}></i>
                    </th>
                  <th style={{border:'none'}}  onClick={() => { this.props.sortByColumnName("activityType"); this.setState({isSortingClicked: !this.state.isSortingClicked}) }}>
                 <div className='table-date'>
                  <p className='table-title'>Activity type </p><i className={this.state.isSortingClicked ? "fas fa-sort-down table-down-icon" : "fas fa-sort-up table-up-icon"}></i>
                  </div>
                     </th>
                  <th style={{border:'none'}}><p className='table-title'>Activity identity</p></th>
                  <th style={{border:'none'}}><p className='table-title'>Activity target</p></th>
                </tr>
              </thead>
              <tbody>
                 { data }               
              </tbody>
            </table>
            </div>
          </div>
        </div>
        {this.state.isOpen ?
          <div className='col-md-4'>
            <ViewAudit singleData={this.state.singleObj} onClose={this.onClose} />
          </div>
          : null}
      </div>
    );
  }
}

export default withTracker((props) => {
  console.log("activities filter");

  Meteor.subscribe('departments');
  return {
    ...props,
    activities: Departments.find({}).fetch()
  };
})(ListAudit);