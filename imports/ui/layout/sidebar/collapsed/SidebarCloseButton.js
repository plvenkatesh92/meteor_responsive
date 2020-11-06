import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/action';

class SidebarCloseButton extends Component {
    render() {
        return (
            <div>
                <div className="col-md-12">
                    <button className="btn btn-default sidebar-close" onClick={() => { this.props.collapseSideBar() }}>
                        <i className="fa fa-close"></i>
                    </button>
                </div> 
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        collapseSideBar: () => dispatch(actions.collapseSideBar())
    }
}

export default connect(null, mapDispatchToProps)(SidebarCloseButton);


// import React from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../../../store/actions/action';

// const SidebarCloseButton = () => {
//     console.log("SidebarCloseButton")
//     return (
//         <div>
//             <div className="col-md-12">
//                 <button className="btn btn-default sidebar-close" onClick={() => { props.collapseSideBar() }}>
//                     <i className="fa fa-close"></i>
//                 </button>
//             </div> 
//         </div>
//     )
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         collapseSideBar: () => dispatch(actions.collapseSideBar())
//     }
// }

// export default connect(null, mapDispatchToProps)(SidebarCloseButton);
