import React, { Component } from 'react';
import ListAudit from './ListAudit';
import './audit.css';

export default class AuditIndex extends Component {
    state = {
        searchBy: "",
        sortByColumn: "",
        sortBy: "",
    }

    onChange = (e) => {
        this.setState({ searchBy: e.target.value });
    }

    sortByColumnName = (columnName) => {
        console.log(columnName)
        this.setState((state, props) => ({
            sortByColumn: columnName,
            sortBy: (state.sortBy == "1" || state.sortBy == "") ? "-1" : "1"
        }));
    }

    render() {        
        return (
                <div className="row">
                    <div className='col-md-12'>
                      <div className='activity-header'>
                        <div>
                            <h5 className="title">Activities</h5>
                        </div>
                      </div>
                    <div className="list-header-card">
                        <p className="form-title">All Activities</p>
                    </div>
                    <div className='divider'/>
                    <div className='overall-body'>
                    <div className='justify-center'>
                        <div className="input-group col-md-3" style={{marginTop: '1.5em'}}>
                            <input type="text" className="form-control" onChange={this.onChange} placeholder="Search" name="search"/>
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit">
                                    <i className="glyphicon glyphicon-search"></i>
                                </button>
                            </div>
                        </div>
                        <div style={{marginTop:'1.5em'}}>
                        </div>
                    </div>
                        <ListAudit { ...this.state } { ...this.props } sortByColumnName={(e) => { this.sortByColumnName(e)}} />
                    </div>      
                    </div>             
                </div>
        )
    }
}

