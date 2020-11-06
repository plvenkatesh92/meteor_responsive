import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Header from './header/Header';
import SidebarLayout from './layout/sidebar/SidebarLayout';
import Audit from './audit';
import './dashboard/dashboard.css';


const App = (props) => {
  console.log("App props", props)
  
  return (
    <div>

        <div className="app-header">
            <Header />
        </div>

        <div className="app-body">
          <div className="container-fluid">
            <div className="row">
              <div>
                <SidebarLayout {...props} />
              </div>
              <div className={props.isSidebarOpen ? "col-md-9 dashboard-right-panel rightContent" : "col-md-11 dashboard-right-panel rightContent right-body-width"}>
                <div>
                  <Audit />
                </div>
              </div>

            </div>
          </div>
        </div>

    </div>
  );
}

const mapStateToProps = state => {
  return {
      isSidebarOpen: state.isSidebarOpen
  }
}

export default withRouter(connect(mapStateToProps, null)(App));
